import { API_ROUTES } from '@graasp/query-client';
import { HttpMethod, formatDate } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import i18n from '../../src/config/i18n';
import {
  AVATAR_UPLOAD_ICON_ID,
  AVATAR_UPLOAD_INPUT_ID,
  CARD_TIP_ID,
  CROP_MODAL_CONFIRM_BUTTON_ID,
  LOGIN_REQUIRED_BUTTON_ID,
  LOGIN_REQUIRED_TEXT_ID,
  MEMBER_AVATAR_IMAGE_ID,
  MEMBER_CREATED_AT_ID,
  MEMBER_USERNAME_DISPLAY_ID,
} from '../../src/config/selectors';
import { BOB, MEMBER_WITH_AVATAR } from '../fixtures/members';
import {
  AVATAR_LINK,
  THUMBNAIL_MEDIUM_PATH,
} from '../fixtures/thumbnails/links';
import { SIGN_IN_PATH } from '../support/server';
import { ID_FORMAT, MemberForTest } from '../support/utils';

const { buildGetCurrentMemberRoute, buildUploadAvatarRoute } = API_ROUTES;
const API_HOST = Cypress.env('VITE_GRAASP_API_HOST');

type TestHelperInput = { currentMember: MemberForTest };
class TestHelper {
  private currentMember: MemberForTest;

  constructor(args: TestHelperInput) {
    this.currentMember = JSON.parse(JSON.stringify(args.currentMember));
  }

  setupServer() {
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
      },
      ({ reply }) =>
        reply({ statusCode: StatusCodes.OK, body: this.currentMember }),
    ).as('getCurrentMember');
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: new RegExp(
          `${API_HOST}/members/${ID_FORMAT}/avatar/(original|large|medium|small)\\?replyUrl\\=true`,
        ),
      },
      ({ reply }) => {
        if (this.currentMember.extra.hasAvatar) {
          return reply({ body: this.currentMember.thumbnail });
        }
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      },
    ).as('getAvatar');
    cy.intercept(
      {
        method: HttpMethod.Post,
        url: new RegExp(`${buildUploadAvatarRoute()}`),
      },
      ({ reply }) => {
        // update avatar
        this.currentMember.extra.hasAvatar = true;
        // use default avatar link as thumbnail, we discard the uploaded thumbnail
        this.currentMember.thumbnail = AVATAR_LINK;
        return reply({ statusCode: StatusCodes.OK });
      },
    ).as('uploadAvatar');
  }
}

describe('Upload Avatar', () => {
  let helpers: TestHelper;
  beforeEach(() => {
    helpers = new TestHelper({ currentMember: BOB });
    helpers.setupServer();
    cy.visit('/');
  });

  it('Upload a new thumbnail', () => {
    // at first card element should exist
    cy.get(`#${CARD_TIP_ID}`).should('exist');
    // select the avatar image
    cy.get(`#${AVATAR_UPLOAD_INPUT_ID}`).selectFile(
      THUMBNAIL_MEDIUM_PATH,
      // use force because the input is visually hidden
      { force: true },
    );
    cy.get(`#${CROP_MODAL_CONFIRM_BUTTON_ID}`)
      .click()
      .then(() => {
        cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should('be.visible');
      });
    cy.wait('@uploadAvatar');
    // card element should not exist
    cy.get(`#${CARD_TIP_ID}`).should('not.exist');
  });
});

describe('Image is not set', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: BOB });
    cy.visit('/');
  });

  it('Image is not set', () => {
    cy.wait('@getCurrentMember');
    cy.get(`#${CARD_TIP_ID}`).should('exist');
    // uploader icon should be visible
    cy.get(`#${AVATAR_UPLOAD_ICON_ID}`).should('be.visible');
    // image display element should not exist
    cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should('not.exist');
  });
});

describe('Check member info', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBER_WITH_AVATAR,
    });
    cy.visit('/');
    cy.wait('@getCurrentMember');
  });

  it('displays the correct member info', () => {
    cy.wait('@getCurrentMemberAvatarUrl');
    // displays the correct member avatar
    cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should(
      'have.attr',
      'src',
      MEMBER_WITH_AVATAR.thumbnail,
    );
    // displays the correct member name
    cy.get(`#${MEMBER_USERNAME_DISPLAY_ID}`).should(
      'contain',
      MEMBER_WITH_AVATAR.name,
    );
    // displays the correct creation date
    const formattedDate = formatDate(MEMBER_WITH_AVATAR.createdAt, {
      locale: i18n.language,
    });
    cy.get(`#${MEMBER_CREATED_AT_ID}`).should('contain', formattedDate);
  });
});

describe('Redirect when not logged in', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: null });
    cy.visit('/');
  });

  it('redirects to the login page when not logged in', () => {
    cy.wait('@getCurrentMember');
    cy.get(`#${LOGIN_REQUIRED_TEXT_ID}`).should('be.visible');
    cy.get(`#${LOGIN_REQUIRED_BUTTON_ID}`).click();
    cy.wait('@signInRedirection');
    cy.url().should('contain', `${SIGN_IN_PATH}?url=`);
  });
});

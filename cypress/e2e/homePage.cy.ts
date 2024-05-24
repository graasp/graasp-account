import { API_ROUTES } from '@graasp/query-client';
import { CompleteMember, HttpMethod, formatDate } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import i18n from '@/config/i18n';
import {
  CARD_TIP_ID,
  CROP_MODAL_CONFIRM_BUTTON_ID,
  IMAGE_AVATAR_UPLOADER,
  MEMBER_AVATAR_ID,
  MEMBER_CREATED_AT_ID,
  USERNAME_DISPLAY_ID,
  buildDataCyWrapper,
} from '@/config/selectors';

import { THUMBNAIL_MEDIUM_PATH } from '../fixtures/Thumbnails/links';
import { BOB, MEMBERS_HAS_AVATAR } from '../fixtures/members';
import { AVATAR_LINK } from '../support/server';
import { ID_FORMAT } from '../support/utils';

const { GET_CURRENT_MEMBER_ROUTE, buildUploadAvatarRoute } = API_ROUTES;
const API_HOST = Cypress.env('VITE_GRAASP_API_HOST');

type CompleteMemberForTest = CompleteMember & { thumbnail?: string };
type TestHelperInput = { currentMember: CompleteMemberForTest };
class TestHelper {
  private currentMember: CompleteMemberForTest;

  constructor(args: TestHelperInput) {
    this.currentMember = JSON.parse(JSON.stringify(args.currentMember));
    this.setupServer();
  }

  setupServer() {
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: `${API_HOST}/${GET_CURRENT_MEMBER_ROUTE}`,
      },
      ({ reply }) =>
        reply({ statusCode: StatusCodes.OK, body: this.currentMember }),
    ).as('getCurrentMember');
    cy.intercept(
      {
        method: HttpMethod.Get,
        // TODO: include all sizes
        url: new RegExp(
          `${API_HOST}/members/${ID_FORMAT}/avatar/(medium|small)\\?replyUrl\\=true`,
        ),
      },
      ({ reply }) => {
        if (this.currentMember.extra.hasAvatar) {
          return reply(this.currentMember.thumbnail);
        }
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      },
    );
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let helpers: TestHelper;
  beforeEach(() => {
    helpers = new TestHelper({ currentMember: BOB });
    // cy.setUpApi();
    cy.visit('/');
  });

  it('Upload a new thumbnail', () => {
    // at first card element should exist
    cy.get(buildDataCyWrapper(CARD_TIP_ID)).should('exist');
    // select the avatar image
    cy.get(buildDataCyWrapper(IMAGE_AVATAR_UPLOADER)).selectFile(
      THUMBNAIL_MEDIUM_PATH,
      // use force because the input is visually hidden
      { force: true },
    );
    cy.get(`#${CROP_MODAL_CONFIRM_BUTTON_ID}`)
      .click()
      .then(() => {
        cy.get(buildDataCyWrapper(MEMBER_AVATAR_ID)).should('be.visible');
      });
    cy.wait('@uploadAvatar');
    // card element should not exist
    cy.get(buildDataCyWrapper(CARD_TIP_ID)).should('not.exist');
  });
});

describe('Image is  not set', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: BOB });
    cy.visit('/');
  });
  it('Image is not set', () => {
    cy.get(buildDataCyWrapper(CARD_TIP_ID)).should('exist');
    // Image element should not exist
    cy.get(buildDataCyWrapper(IMAGE_AVATAR_UPLOADER)).should('not.exist');
  });
});

describe('Check  member info', () => {
  const formattedDate = formatDate(MEMBERS_HAS_AVATAR.BOB.createdAt, {
    locale: i18n.language,
  });
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBERS_HAS_AVATAR.BOB,
      members: Object.values(MEMBERS_HAS_AVATAR),
    });
    cy.visit('/');
    cy.wait('@getCurrentMember');
  });
  it('displays the correct member info', () => {
    // displays the correct member avatar
    cy.get(buildDataCyWrapper(MEMBER_AVATAR_ID)).should(
      'have.attr',
      'src',
      MEMBERS_HAS_AVATAR.BOB.thumbnails,
    );
    // displays the correct member name
    cy.get(buildDataCyWrapper(USERNAME_DISPLAY_ID)).should(
      'contain',
      MEMBERS_HAS_AVATAR.BOB.name,
    );
    // displays the correct creation date

    cy.get(buildDataCyWrapper(MEMBER_CREATED_AT_ID)).should(
      'contain',
      formattedDate,
    );
  });
});

describe('Redirect when not logged in', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: null });
  });

  it('redirects to the login page when not logged in', () => {
    cy.visit('/');
    cy.url().should('include', `?url=`);
  });
});

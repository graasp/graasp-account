import { PUBLIC_PROFILE_PATH } from '@/config/paths';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_SAVE_BUTTON_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';

import { BOB, MEMBER_PUBLIC_PROFILE } from '../fixtures/members';

const changeLinkedin = (newLinkedin: string) => {
  cy.visit(PUBLIC_PROFILE_PATH);
  cy.get('input[name=linkedinID]').clear();
  cy.get('input[name=linkedinID]').type(newLinkedin);
};
const changeTwitter = (newTwitter: string) => {
  cy.visit(PUBLIC_PROFILE_PATH);
  cy.get('input[name=twitterID]').clear();
  cy.get('input[name=twitterID]').type(newTwitter);
};
const changeFacebook = (newFacebook: string) => {
  cy.visit(PUBLIC_PROFILE_PATH);
  cy.get('input[name=facebookID]').clear();
  cy.get('input[name=facebookID]').type(newFacebook);
};
const invalidLinkedinUrlWithSymbol = 'https://www.linke@din.com/in/sample';
const invalidTwitterUrlWithSymbol = 'https://www.twitte@r.com/sample';
const invalidFacebookUrlWithSymbol = 'https://www.faceb@ook.com/sample';

const invalidLinkedinUrlWithRegexChar = 'https://www.linkedin.com/in/sam*ple';
const invalidTwitterUrlWithRegexChar = 'https://www.twitter.com/sam*ple';
const invalidFacebookUrlWithRegexChar = 'https://www.facebook.com/sam*ple';

const invalidLinkedInUrl = 'https://www.linkedin.com/in/';
const invalidFacebookUrl = 'https://www.facebook.com/';
const invalidTwitterUrl = 'https://twitter.com/';

const validUrlWithSimpleWord = 'simple';

describe('Member public profile page', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(PUBLIC_PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });

  it('displays the correct member public profile info', () => {
    // displays the correct member bio value
    cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).should(
      'have.value',
      MEMBER_PUBLIC_PROFILE.bio,
    );
    // displays the correct member linkedin value
    cy.get(`#${PUBLIC_PROFILE_LINKEDIN_ID}`).should(
      'have.value',
      `https://linkedin.com/in/${MEMBER_PUBLIC_PROFILE.linkedinID}`,
    );
    // displays the correct member twitter value
    cy.get(`#${PUBLIC_PROFILE_TWITTER_ID}`).should(
      'have.value',
      `https://twitter.com/${MEMBER_PUBLIC_PROFILE.twitterID}`,
    );
    // displays the correct member facebook value
    cy.get(`#${PUBLIC_PROFILE_FACEBOOK_ID}`).should(
      'have.value',
      `https://facebook.com/${MEMBER_PUBLIC_PROFILE.facebookID}`,
    );
  });

  it('bio field cannot be empty ', () => {
    cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).clear();
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');
  });
});

describe('Linkedin URLs', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(PUBLIC_PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });
  it('invalid linkedin url cannot be saved', () => {
    changeLinkedin(invalidLinkedInUrl);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeLinkedin(invalidLinkedinUrlWithRegexChar);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeLinkedin(invalidLinkedinUrlWithSymbol);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');
  });
  it('valid linkedin url can be saved', () => {
    cy.get('input[name=linkedinID]').clear();
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.linkedinID).to.equal('');
    });

    changeLinkedin(validUrlWithSimpleWord);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.linkedinID).to.equal(validUrlWithSimpleWord);
    });
  });
});

describe('Twitter URLs', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(PUBLIC_PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });
  it('invalid twitter url cannot be saved', () => {
    changeTwitter(invalidTwitterUrl);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeTwitter(invalidTwitterUrlWithSymbol);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeTwitter(invalidTwitterUrlWithRegexChar);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');
  });
  it('valid twitter url can be saved', () => {
    // empty url can be saved
    cy.get('input[name=twitterID]').clear();
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.twitterID).to.equal('');
    });

    // type valid url
    changeTwitter(validUrlWithSimpleWord);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.twitterID).to.equal(validUrlWithSimpleWord);
    });
  });
});

describe('Facebbok URLs', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(PUBLIC_PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });
  it('invalid facebook url cannot be saved', () => {
    changeFacebook(invalidFacebookUrl);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeFacebook(invalidFacebookUrlWithSymbol);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');

    changeFacebook(invalidFacebookUrlWithRegexChar);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');
  });
  it('valid facebook url can be saved', () => {
    // empty url can be saved
    cy.get('input[name=facebookID]').clear();
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.facebookID).to.equal('');
    });

    // type valid url
    changeFacebook(validUrlWithSimpleWord);
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
    cy.wait('@editPublicProfile').then(({ request: { body } }) => {
      expect(body.facebookID).to.equal(validUrlWithSimpleWord);
    });
  });
});

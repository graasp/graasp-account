import { PROFILE_PATH } from '@/config/paths';
import {
  MEMBER_PROFILE_EMAIL_ID,
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_TWITTER_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import { BOB, MEMBER_PUBLIC_PROFILE } from '../fixtures/members';

describe('Check member info', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });

  it('displays the correct member info', () => {
    // displays the correct member name
    cy.get(`#${USERNAME_DISPLAY_ID}`).should('contain', BOB.name);
    // displays the correct member email
    cy.get(`#${MEMBER_PROFILE_EMAIL_ID}`).should('contain', BOB.email);
  });

  it('displays the correct public profile info', () => {
    // displays the correct bio
    cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).should(
      'contain',
      MEMBER_PUBLIC_PROFILE.bio,
    );
    // displays the correct member linkedin
    cy.get(`#${PUBLIC_PROFILE_LINKEDIN_ID}`).should(
      'contain',
      MEMBER_PUBLIC_PROFILE.linkedinID,
    );
    // displays the correct member twitter
    cy.get(`#${PUBLIC_PROFILE_TWITTER_ID}`).should(
      'contain',
      MEMBER_PUBLIC_PROFILE.twitterID,
    );
    // displays the correct member facebook
    cy.get(`#${PUBLIC_PROFILE_FACEBOOK_ID}`).should(
      'contain',
      MEMBER_PUBLIC_PROFILE.facebookID,
    );
  });
});

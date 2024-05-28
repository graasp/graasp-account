import {
  MEMBER_PROFILE_EMAIL_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import { BOB } from '../fixtures/members';

describe('Check member info', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit('/');
    cy.wait('@getCurrentMember');
  });

  it('displays the correct member info', () => {
    // displays the correct member name
    cy.get(`#${USERNAME_DISPLAY_ID}`).should('contain', BOB.name);
    // displays the correct member email
    cy.get(`#${MEMBER_PROFILE_EMAIL_ID}`).should('contain', BOB.email);
  });
});

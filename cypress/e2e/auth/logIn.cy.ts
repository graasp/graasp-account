import { LOG_IN_PAGE_PATH } from '../../../src/config/paths';
import {
  MAGIC_LINK_EMAIL_FIELD_ID,
  SUCCESS_CONTENT_ID,
} from '../../../src/config/selectors';
import { AUTH_MEMBERS } from '../../fixtures/members';

describe('Name and Email Validation', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: null });
  });
  it('Log In', () => {
    const { GRAASP, WRONG_EMAIL } = AUTH_MEMBERS;
    cy.visit(LOG_IN_PAGE_PATH);
    // Signing in with a wrong email format
    cy.signInByMailAndCheck(WRONG_EMAIL);
    // Signing in with a valid email
    cy.signInByMailAndCheck(GRAASP);
  });
});

describe('Already signed in', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: AUTH_MEMBERS.BOB });
  });

  it('Should show account home', () => {
    cy.visit('/auth');
    cy.get(`h4`).should('contain', 'Welcome');
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: null });
    cy.visit(LOG_IN_PAGE_PATH);
  });
  it('Can use Enter to validate email', () => {
    cy.get(`#${MAGIC_LINK_EMAIL_FIELD_ID}`).type(
      `${AUTH_MEMBERS.BOB.email}{Enter}`,
    );
    cy.get(`#${SUCCESS_CONTENT_ID}`)
      .should('be.visible')
      .and('contain.text', 'Welcome back');
  });
});

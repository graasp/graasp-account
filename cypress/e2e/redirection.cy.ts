import { ACCOUNT_HOME_PATH, LOG_IN_PAGE_PATH } from '../../src/config/paths';

describe('Redirections', () => {
  it('redirects to the login page when not logged in', () => {
    cy.setUpApi({ currentMember: null });
    cy.visit(ACCOUNT_HOME_PATH);
    cy.wait('@getCurrentMember');
    cy.url().should('contain', `/auth/login?url=`);
  });

  it('redirects to account when already logged in', () => {
    cy.setUpApi({});
    cy.visit(LOG_IN_PAGE_PATH);
    cy.wait('@getCurrentMember');
    cy.url().should('contain', `/account`);
  });
});

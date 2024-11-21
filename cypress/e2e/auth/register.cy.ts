import { API_ROUTES } from '@graasp/query-client';

import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  REGISTER_BUTTON_ID,
  REGISTER_SAVE_ACTIONS_ID,
  SUCCESS_CONTENT_ID,
} from '../../../src/config/selectors';
import { AUTH_MEMBERS } from '../../fixtures/members';
import { checkInvitationFields, fillSignUpLayout } from './util';

describe('Register', () => {
  describe('Must accept all terms to register', () => {
    beforeEach(() => {
      cy.visit('/auth/register');
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });
    });

    it('Cannot register without accepting terms', () => {
      cy.get(`#${REGISTER_BUTTON_ID}`).should('be.disabled');
    });

    it('Register is available when accepting all terms', () => {
      fillSignUpLayout({ name: 'name', email: 'email' });
      cy.get(`#${REGISTER_BUTTON_ID}`).should('be.disabled');

      cy.agreeWithAllTerms();
      cy.get(`#${REGISTER_BUTTON_ID}`).should('not.be.disabled');
    });
  });

  describe('Name and Email Validation', () => {
    it('Register', () => {
      const { GRAASP, WRONG_NAME, INVALID_EMAIL: WRONG_EMAIL } = AUTH_MEMBERS;
      cy.visit('/auth/register');
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });

      // Signing up with a wrong name and right email
      cy.signUpAndCheck(WRONG_NAME, true);
      // Signing up with a wrong email and right name
      cy.signUpAndCheck(WRONG_EMAIL, true);
      // Signing up with right email and name
      cy.signUpAndCheck(GRAASP, true);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');
    });

    it('Register from invitation with name', () => {
      const invitation = {
        id: v4(),
        name: 'name',
        email: 'email',
      };
      cy.intercept(
        API_ROUTES.buildGetInvitationRoute(invitation.id),
        ({ reply }) => {
          reply(invitation);
        },
      );
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`/auth/register?${search.toString()}`);
      checkInvitationFields(invitation);
    });

    it('Register from invitation without name', () => {
      const invitation = {
        id: v4(),
        email: 'email',
      };
      cy.intercept(
        API_ROUTES.buildGetInvitationRoute(invitation.id),
        invitation,
      );
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`/auth/register?${search.toString()}`);
      checkInvitationFields(invitation);
    });

    it('Register with invalid invitation', () => {
      const invitation = {
        id: v4(),
        email: 'email',
      };
      cy.intercept(API_ROUTES.buildGetInvitationRoute(invitation.id), {
        statusCode: 404,
        body: { message: '404 Not Found!' },
      });
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`/auth/register?${search.toString()}`);
      cy.get(`#${REGISTER_BUTTON_ID}`).should('be.visible');
    });

    it('Username can not contain special characters', () => {
      const badUsername = '<<div>%^\'"';

      cy.visit('/auth/register');
      cy.get(`#${NAME_SIGN_UP_FIELD_ID}`).clear();
      cy.get(`#${NAME_SIGN_UP_FIELD_ID}`).type(badUsername);
      cy.get(`#${EMAIL_SIGN_UP_FIELD_ID}`).clear();
      cy.get(`#${EMAIL_SIGN_UP_FIELD_ID}`).type('test@test.lol');
      cy.agreeWithAllTerms();
      cy.get(`#${REGISTER_BUTTON_ID}`).click();

      // The helper text should display the message about special characters
      cy.get('[id$=-helper-text]').should(
        'have.text',
        'User name must not contain " ", ", <, >, ^, %, \\',
      );
    });
  });

  describe('Defining analytics on register', () => {
    beforeEach(() => {
      cy.visit('/auth/register');
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      }).as('waitOnRegister');
    });

    it('Analytics should be visible and checked', () => {
      cy.get(`#${REGISTER_SAVE_ACTIONS_ID}`)
        .should('exist')
        .should('be.checked');
    });

    it('Register with analytics enabled', () => {
      cy.signUpAndCheck(AUTH_MEMBERS.GRAASP, true);
      cy.wait('@waitOnRegister')
        .its('request.body.enableSaveActions')
        .should('eq', true);
    });

    it('Register with analytics disabled', () => {
      cy.get(`#${REGISTER_SAVE_ACTIONS_ID}`).click().should('not.be.checked');
      cy.signUpAndCheck(AUTH_MEMBERS.GRAASP, true);
      cy.wait('@waitOnRegister')
        .its('request.body.enableSaveActions')
        .should('eq', false);
    });
  });
});

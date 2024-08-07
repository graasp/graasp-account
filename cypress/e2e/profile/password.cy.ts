import { StatusCodes } from 'http-status-codes';

import { PROFILE_PATH } from '@/config/paths';
import {
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_DISPLAY_INFORMATION_ID,
  PASSWORD_EDIT_BUTTON_ID,
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '@/config/selectors';

import { BOB } from '../../fixtures/members';

describe('Password Display', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');
  });

  it('Show message', () => {
    cy.get(`#${PASSWORD_DISPLAY_CONTAINER_ID}`).should('be.visible');
    cy.get(`#${PASSWORD_DISPLAY_INFORMATION_ID}`).should('be.visible');
  });
});

describe('Password Edit', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');
    cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).click();
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should('be.visible');
  });

  it('button should be disabled when password is not strong', () => {
    const weakPassword = 'weakPassword';

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(weakPassword);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(weakPassword);

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('button should be disabled when password is empty', () => {
    const weakPassword = 'weakPassword';

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(weakPassword);
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).clear();

    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(weakPassword);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).clear();

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('should update password successfully when password is strong', () => {
    const strongPassword = 'StrongPassword123';

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(strongPassword);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(strongPassword);
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.wait('@updatePassword')
      .its('response.statusCode')
      .should('eq', StatusCodes.OK);
  });
});

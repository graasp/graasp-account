import { PROFILE_PATH } from 'config/paths';

import {
  PERSONAL_INFO_CANCEL_BUTTON_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  PERSONAL_INFO_SAVE_BUTTON_ID,
  READ_MODE_MEMBER_INFO_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import { BOB, MEMBERS } from '../fixtures/members';

const changeUsername = (newUserName: string) => {
  cy.get('input[name=username]').clear();
  // Find the input field and type the new username
  cy.get('input[name=username]').type(newUserName);
};

describe('Change username', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: BOB });
    cy.visit(PROFILE_PATH);
    cy.get(`#${PERSONAL_INFO_EDIT_BUTTON_ID}`).click();
  });

  it('Username field cannot be empty', () => {
    changeUsername('validUsername');
    cy.get('input[name=username]').clear();
    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Username too long', () => {
    const longUsername = MEMBERS.WRONG_NAME_TOO_LONG.name;
    changeUsername(longUsername);

    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Username too short', () => {
    const shortUsername = MEMBERS.WRONG_NAME_TOO_SHORT.name;
    changeUsername(shortUsername);
    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Valid username can be saved', () => {
    const validUsername = 'validUsername';
    changeUsername(validUsername);
    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('not.be.disabled');

    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).click();
    cy.get(`#${READ_MODE_MEMBER_INFO_ID}`).should('be.visible');
    cy.wait('@editMember').then(({ request: { body } }) => {
      expect(body.name).to.equal(validUsername);
    });
  });

  it('Should not update the user name if canceling edit', () => {
    changeUsername('validUsername');
    cy.get(`#${PERSONAL_INFO_CANCEL_BUTTON_ID}`).click();
    cy.get(`#${USERNAME_DISPLAY_ID}`).contains(BOB.name);
  });

  it('Saves username after trimming trailing space', () => {
    const usernameWithTrailingSpace = 'test  '; // Nom d'utilisateur avec espace à la fin
    changeUsername(usernameWithTrailingSpace);
    cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).click();
    cy.wait('@editMember').then(({ request }) => {
      expect(request.body.name).to.equal(usernameWithTrailingSpace.trim());
    });
  });
});

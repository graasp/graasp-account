import { EDIT_MEMBER_INFO } from 'config/paths';

import {
  USERNAME_CANCEL_BUTTON_ID,
  USERNAME_DISPLAY_ID,
  USERNAME_EDIT_BUTTON_ID,
  USERNAME_SAVE_BUTTON_ID,
} from '@/config/selectors';

import { BOB, MEMBERS } from '../fixtures/members';

const changeUsername = (newUserName: string) => {
  cy.get(`#${USERNAME_EDIT_BUTTON_ID}`).click();
  cy.get('input[name=username]').clear();
  // Find the input field and type the new username
  cy.get('input[name=username]').type(newUserName);
};

describe('Change username', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: BOB });
    cy.visit(EDIT_MEMBER_INFO);
  });

  it('Username field cannot be empty', () => {
    changeUsername('validUsername');
    cy.get('input[name=username]').clear();
    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Username too long', () => {
    const longUsername = MEMBERS.WRONG_NAME_TOO_LONG.name;
    changeUsername(longUsername);

    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Username too short', () => {
    const shortUsername = MEMBERS.WRONG_NAME_TOO_SHORT.name;
    changeUsername(shortUsername);
    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).should('be.disabled');
  });

  it('Valid username can be saved', () => {
    const validUsername = 'validUsername';
    changeUsername(validUsername);
    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).should('not.be.disabled');

    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).click();

    cy.wait('@editMember').then(({ request: { body } }) => {
      expect(body.name).to.equal(validUsername);
    });
  });

  it('Should not update the user name if canceling edit', () => {
    changeUsername('validUsername');
    cy.get(`#${USERNAME_CANCEL_BUTTON_ID}`).click();
    cy.get(`#${USERNAME_DISPLAY_ID}`).contains(BOB.name);
  });

  it('Saves username after trimming trailing space', () => {
    const usernameWithTrailingSpace = 'test  '; // Nom d'utilisateur avec espace à la fin
    changeUsername(usernameWithTrailingSpace);
    cy.get(`#${USERNAME_SAVE_BUTTON_ID}`).click();
    cy.wait('@editMember').then(({ request }) => {
      expect(request.body.name).to.equal(usernameWithTrailingSpace.trim());
    });
  });
});

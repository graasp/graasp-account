import { FAILURE_MESSAGES, namespaces } from '@graasp/translations';

import i18n, { ACCOUNT_NAMESPACE } from '../../../src/config/i18n';
import { PROFILE_PATH } from '../../../src/config/paths';
import {
  PASSWORD_CREATE_CONTAINER_ID,
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_EDIT_BUTTON_ID,
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_CURRENT_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '../../../src/config/selectors';
import { ACCOUNT } from '../../../src/langs/constants';
import { BOB } from '../../fixtures/members';

const MOCK_CURRENT_PASSWORD = 'qwertzuiop1!D';
const WEAK_PASSWORD = 'weakPassword';
const STRONG_PASSWORD = 'StrongPassword123';

const submitPasswordForm = ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}) => {
  if (currentPassword) {
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(currentPassword);
  }
  if (newPassword) {
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(newPassword);
  }
  if (confirmNewPassword) {
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(confirmNewPassword);
  }
};

const openPasswordEdition = () => {
  cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).click();
};

describe('Create new password', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      hasPassword: false,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');

    i18n.changeLanguage(BOB.extra.lang);
    i18n.setDefaultNamespace(ACCOUNT_NAMESPACE);
  });

  it('Show configure message when no password is set', () => {
    cy.get(`#${PASSWORD_DISPLAY_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_SETTINGS_INFORMATION_NEW_PASSWORD),
    );
    cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.CONFIGURE_BUTTON_LABEL),
    );
  });

  it('Show error on empty inputs', () => {
    openPasswordEdition();

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');

    // should show input required message
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}-helper-text`).should(
      'contain',
      i18n.t(ACCOUNT.REQUIRED_FIELD_ERROR),
    );
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}-helper-text`).should(
      'contain',
      i18n.t(ACCOUNT.REQUIRED_FIELD_ERROR),
    );
  });

  it('Show error on weak new password', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: WEAK_PASSWORD,
    });
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show weak message
    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_WEAK_ERROR),
    );
  });

  it('Show error on new password not matching', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: `${WEAK_PASSWORD}wrong`,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show not-matching new passwords
    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_DO_NOT_MATCH_ERROR),
    );
  });

  it('Should set password successfully when password is strong', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: STRONG_PASSWORD,
      confirmNewPassword: STRONG_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.wait('@createPassword').then(({ request: { body } }) => {
      expect(body.password).to.eq(STRONG_PASSWORD);
    });
  });
});

describe('Create new password - network error', () => {
  it('Show error network message', () => {
    cy.setUpApi({
      currentMember: BOB,
      hasPassword: false,
      createPasswordError: true,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');

    i18n.changeLanguage(BOB.extra.lang);
    i18n.setDefaultNamespace(ACCOUNT_NAMESPACE);

    openPasswordEdition();

    submitPasswordForm({
      newPassword: STRONG_PASSWORD,
      confirmNewPassword: STRONG_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      i18n.t(FAILURE_MESSAGES.UNEXPECTED_ERROR, {
        ns: namespaces.messages,
      }),
    );
  });
});

describe('Update password', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
      hasPassword: true,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');

    i18n.changeLanguage(BOB.extra.lang);
    i18n.setDefaultNamespace(ACCOUNT_NAMESPACE);
  });

  it('Show error on empty inputs', () => {
    openPasswordEdition();

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');

    // should show input required message
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}-helper-text`).should(
      'contain',
      i18n.t(ACCOUNT.REQUIRED_FIELD_ERROR),
    );
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}-helper-text`).should(
      'contain',
      i18n.t(ACCOUNT.REQUIRED_FIELD_ERROR),
    );
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}-helper-text`).should(
      'contain',
      i18n.t(ACCOUNT.REQUIRED_FIELD_ERROR),
    );
  });

  it('Show edit message when a password is set', () => {
    cy.get(`#${PASSWORD_DISPLAY_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_SETTINGS_INFORMATION),
    );
    cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.EDIT_BUTTON_LABEL),
    );
  });

  it('Show error on weak new password', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: WEAK_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show weak message
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_WEAK_ERROR),
    );
  });

  it('Show error on new password not matching', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: `${WEAK_PASSWORD}wrong`,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show not-matching new passwords
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.PASSWORD_DO_NOT_MATCH_ERROR),
    );
  });

  it('Show error if new password is same as current', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: MOCK_CURRENT_PASSWORD,
      confirmNewPassword: MOCK_CURRENT_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show matching current and new password
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      i18n.t(ACCOUNT.NEW_PASSWORD_SHOULD_NOT_MATCH_CURRENT_PASSWORD_ERROR),
    );
  });

  it('Should update password successfully when password is strong', () => {
    openPasswordEdition();

    // fill current password with mock password
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(
      MOCK_CURRENT_PASSWORD,
    );

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.wait('@updatePassword').then(({ request: { body } }) => {
      expect(body.password).to.eq(STRONG_PASSWORD);
      expect(body.currentPassword).to.eq(MOCK_CURRENT_PASSWORD);
    });
  });
});
describe('Update password - network error', () => {
  it('Show error network message', () => {
    cy.setUpApi({
      currentMember: BOB,
      hasPassword: true,
      updatePasswordError: true,
    });
    cy.visit(PROFILE_PATH);
    cy.wait('@getCurrentMember');

    i18n.changeLanguage(BOB.extra.lang);
    i18n.setDefaultNamespace(ACCOUNT_NAMESPACE);

    openPasswordEdition();

    // fill current password with mock password
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(
      MOCK_CURRENT_PASSWORD,
    );

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      i18n.t(FAILURE_MESSAGES.UNEXPECTED_ERROR, {
        ns: namespaces.messages,
      }),
    );
  });
});

import { SETTINGS_PATH } from '@/config/paths';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_CLOSE_BUTTON_ID,
  PREFERENCES_EDIT_BUTTON_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_SWITCH_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '@/config/selectors';

import { BOB, CURRENT_MEMBER } from '../../fixtures/members';
import { mockGetCurrentMember } from '../../support/server';
import { buildDataCySelector } from '../../support/utils';

const currentMember = CURRENT_MEMBER;

const expectEnableSaveActionsInRequestToBe = (enableSaveActions: boolean) => {
  cy.wait('@editMember')
    .its('request.body.enableSaveActions')
    .should('eq', enableSaveActions);
};

const expectEnableSaveActionsInResponseToBe = (enableSaveActions: boolean) =>
  cy
    .wait('@getCurrentMember')
    .its('response.body.enableSaveActions')
    .should('eq', enableSaveActions);

const expectAnalyticsSwitchToBe = (enabled: boolean) => {
  cy.visit(SETTINGS_PATH);
  cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();
  cy.wait('@getCurrentMember');

  if (enabled) {
    cy.get(
      buildDataCySelector(PREFERENCES_ANALYTICS_SWITCH_ID, 'input'),
    ).should('be.checked');
  } else {
    cy.get(
      buildDataCySelector(PREFERENCES_ANALYTICS_SWITCH_ID, 'input'),
    ).should('not.be.checked');
  }
};

const clickOnAnalyticsSwitch = () =>
  cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID} input`).click();

const checkAnalyticsAfterUpdate = (shouldSaveActionsBeEnabled: boolean) => {
  const enableSaveActions = shouldSaveActionsBeEnabled;
  mockGetCurrentMember({ ...currentMember, enableSaveActions });
  clickOnAnalyticsSwitch();
  cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();
  expectEnableSaveActionsInRequestToBe(enableSaveActions);
  expectAnalyticsSwitchToBe(enableSaveActions);
  expectEnableSaveActionsInResponseToBe(enableSaveActions);
  expectAnalyticsSwitchToBe(enableSaveActions);
};

const switchLanguage = (newLanguageValue: string) => {
  cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).should('be.visible'); // Ensure the element is visible
  cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).click();

  cy.get(`[role="option"][data-value="${newLanguageValue}"]`).click();
};

const switchEmailFreq = (newEmailFreqValue: string) => {
  cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).should('be.visible'); // Ensure the element is visible
  cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).click();

  cy.get(`[role="option"][data-value="${newEmailFreqValue}"]`).click();
};

describe('Checks the analytics switch', () => {
  describe('enableSaveActions is enabled', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: {
          ...currentMember,
          enableSaveActions: true,
        },
      });
      cy.visit(SETTINGS_PATH);
      cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();
      cy.wait('@getCurrentMember');
    });

    it('Analytics switch should be enabled', () => {
      expectAnalyticsSwitchToBe(true);
    });

    it('Disable analytics switch', () => {
      checkAnalyticsAfterUpdate(false);
    });
  });

  describe('enableSaveActions is disabled', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: {
          ...currentMember,
          enableSaveActions: false,
        },
      });
      cy.visit(SETTINGS_PATH);
      cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();
      cy.wait('@getCurrentMember');
    });

    it('Analytics switch should be enabled', () => {
      expectAnalyticsSwitchToBe(false);
    });

    it('Disable analytics switch', () => {
      checkAnalyticsAfterUpdate(true);
    });
  });
});

describe('Checks the current member language', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: { ...currentMember, extra: { lang: 'es' } },
    });
    cy.visit(SETTINGS_PATH);
    cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

    cy.wait('@getCurrentMember');
  });

  it('should display the member language', () => {
    cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).should('contain', 'Español');
  });
});
describe('Checks the language switch', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(SETTINGS_PATH);
    cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

    cy.wait('@getCurrentMember');
  });
  it('should select an option from the select component', () => {
    switchLanguage('de');
    cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();
    cy.wait('@editMember').then(({ request }) => {
      expect(request.body.extra.lang).to.equal('de');
    });
  });
});

describe('Checks the current email frequency', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: {
        ...currentMember,
        extra: { emailFreq: 'always', langs: 'en' },
      },
    });
    cy.visit(SETTINGS_PATH);
    cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

    cy.wait('@getCurrentMember');
  });

  it('should display the correct email frequency value', () => {
    cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).should(
      'contain',
      'Always receive email notifications',
    );
  });
});

describe('Checks the email frequency switch', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(SETTINGS_PATH);
    cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

    cy.wait('@getCurrentMember');
  });
  it('should select an option from the select component', () => {
    switchEmailFreq('always');
    cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();
    cy.wait('@editMember').then(({ request }) => {
      expect(request.body.extra.emailFreq).to.equal('always');
    });
  });
});

describe('Check the close button', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(SETTINGS_PATH);
    cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

    cy.wait('@getCurrentMember');
  });

  it('should not update preferences if canceling edit and displays read only settings page', () => {
    switchLanguage('de');
    switchEmailFreq('always');
    cy.get(`#${PREFERENCES_CLOSE_BUTTON_ID}`).click();
    cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).should('contain', 'English');
    cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).should(
      'contain',
      'Always receive email notifications',
    );
  });
});

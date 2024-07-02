import { EDIT_MEMBER_PREFERENCES, MANAGE_ACCOUNT_PATH } from '@/config/paths';
import {
  MEMBER_PROFILE_ANALYTICS_SWITCH_ID,
  MEMBER_PROFILE_EDIT_PREFERENCES_BUTTON_ID,
  MEMBER_PROFILE_EMAIL_FREQUENCY_ID,
  MEMBER_PROFILE_LANGUAGE_SWITCH_ID,
} from '@/config/selectors';

import { BOB } from '../fixtures/members';

describe('Check member preferences', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(MANAGE_ACCOUNT_PATH);
    cy.wait('@getCurrentMember');
  });

  it('displays the correct langauge', () => {
    const langs = {
      de: 'German',
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      ar: 'Arabic',
    };

    const expectedLanguageName = langs[BOB.extra.lang as keyof typeof langs];

    // displays the correct member langauge
    cy.get(`#${MEMBER_PROFILE_LANGUAGE_SWITCH_ID}`).should(
      'contain',
      expectedLanguageName,
    );
  });

  it('displays the correct email frequency when always', () => {
    const expectedEmailFreqText = 'Always receive email notifications';

    cy.get(`#${MEMBER_PROFILE_EMAIL_FREQUENCY_ID}`).should(
      'contain',
      expectedEmailFreqText,
    );
  });

  it('displays the correct email frequency when never', () => {
    // Update BOB's emailFreq to 'never'
    const BOB_NEVER = { ...BOB, extra: { ...BOB.extra, emailFreq: 'never' } };

    cy.setUpApi({
      currentMember: BOB_NEVER,
    });
    cy.visit(MANAGE_ACCOUNT_PATH);
    cy.wait('@getCurrentMember');

    const expectedEmailFreqText = 'Disable email notifications';
    cy.get(`#${MEMBER_PROFILE_EMAIL_FREQUENCY_ID}`).should(
      'contain',
      expectedEmailFreqText,
    );
  });

  it('displays the correct enable analytics when true', () => {
    const expectedEnableanalyticsText = 'Enabled';

    cy.get(`#${MEMBER_PROFILE_ANALYTICS_SWITCH_ID}`).should(
      'contain',
      expectedEnableanalyticsText,
    );
  });

  it('displays the correct enable analytics when false', () => {
    // Update BOB's enable save actions  to false
    const BOB_DISABLED = { ...BOB, enableSaveActions: false };

    cy.setUpApi({
      currentMember: BOB_DISABLED,
    });
    cy.visit(MANAGE_ACCOUNT_PATH);
    cy.wait('@getCurrentMember');

    const expectedEnableanalyticsText = 'Disabled';
    cy.get(`#${MEMBER_PROFILE_ANALYTICS_SWITCH_ID}`).should(
      'contain',
      expectedEnableanalyticsText,
    );
  });
});

describe('Check the edit button', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: BOB,
    });
    cy.visit(MANAGE_ACCOUNT_PATH);
    cy.wait('@getCurrentMember');
  });
  it('after click should redirect to edit preferences page', () => {
    cy.get(`#${MEMBER_PROFILE_EDIT_PREFERENCES_BUTTON_ID}`).click();
    cy.location('pathname').should('eq', `${EDIT_MEMBER_PREFERENCES}`);
  });
});

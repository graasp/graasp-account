import { SETTINGS_PATH } from '@/config/paths';
import { EXPORT_DATA_BUTTON_ID } from '@/config/selectors';

import { CURRENT_MEMBER } from '../../fixtures/members';

describe('Check exporting data', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.visit(SETTINGS_PATH);
  });
  it('should disable the export button after clicking it', () => {
    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).should('be.enabled');

    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).click();
    cy.wait('@exportData');

    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).should('be.disabled');
  });
});

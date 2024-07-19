import { formatFileSize } from '@graasp/sdk';

import { STORAGE_PATH } from '@/config/paths';
import { STORAGE_BAR_LABEL_ID } from '@/config/selectors';

import { CURRENT_MEMBER } from '../fixtures/members';

describe('Storage', () => {
  it('Display storage interface', () => {
    const storageAmount = 698789;
    cy.setUpApi({ currentMember: CURRENT_MEMBER, storageAmount });
    cy.visit(STORAGE_PATH);
    cy.wait('@getCurrentMemberStorage');
    cy.get(`#${STORAGE_BAR_LABEL_ID}`).should(
      'contain',
      formatFileSize(storageAmount),
    );
  });
});

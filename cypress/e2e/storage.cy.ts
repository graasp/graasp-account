import { STORAGE_PATH } from '@/config/paths';

import { CURRENT_MEMBER } from '../fixtures/members';

describe('Storage', () => {
  it('Display storage interface', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.visit(STORAGE_PATH);
    cy.wait('@getCurrentMemberStorage');
  });
});

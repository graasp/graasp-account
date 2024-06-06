import { PROFILE_PATH } from '@/config/paths';

import { BOB, MEMBER_PUBLIC_PROFILE } from '../fixtures/members';

describe('Member public profile page', () => {
  beforeEach(() => {
    cy.visit(PROFILE_PATH);
    cy.setUpApi({
      currentMember: BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });
});

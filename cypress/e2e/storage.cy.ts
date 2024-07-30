import { formatFileSize } from '@graasp/sdk';

import { STORAGE_PATH } from '@/config/paths';
import {
  MEMBER_STORAGE_FILE_NAME_ID,
  MEMBER_STORAGE_FILE_SIZE_ID,
  MEMBER_STORAGE_FILE_UPDATED_AT_ID,
  MEMBER_STORAGE_PARENT_FOLDER_ID,
  STORAGE_BAR_LABEL_ID,
} from '@/config/selectors';

import {
  CURRENT_MEMBER,
  MEMBER_STORAGE_ITEM_RESPONSE,
} from '../fixtures/members';

describe('Storage', () => {
  it('Display storage interface', () => {
    const storageAmountInBytes = 698789;
    cy.setUpApi({ currentMember: CURRENT_MEMBER, storageAmountInBytes });
    cy.visit(STORAGE_PATH);
    cy.wait('@getCurrentMemberStorage');
    cy.get(`#${STORAGE_BAR_LABEL_ID}`).should(
      'contain',
      formatFileSize(storageAmountInBytes),
    );
  });
});

describe('Storage files', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: CURRENT_MEMBER,
      files: MEMBER_STORAGE_ITEM_RESPONSE,
    });
    cy.visit(STORAGE_PATH);
    cy.wait('@getMemberStorageFiles');
  });

  it.only('displays storage files of each page', () => {
    const files = MEMBER_STORAGE_ITEM_RESPONSE.data;
    const filesPerPage = 10;
    const numberPages = Math.ceil(files.length / filesPerPage);

    for (let i = 0; i < numberPages; i += 1) {
      const startIndex = i * filesPerPage;
      const endIndex = Math.min(startIndex + filesPerPage, files.length);
      const shouldDisplay = files.slice(startIndex, endIndex);

      cy.get('tbody tr').should('have.length', shouldDisplay.length);

      shouldDisplay.forEach((file, fileIndex) => {
        cy.get('tbody tr')
          .eq(fileIndex)
          .scrollIntoView()
          .should('be.visible')
          .within(() => {
            cy.get(`#${MEMBER_STORAGE_FILE_NAME_ID}`).should(
              'contain',
              file.name,
            );
            cy.get(`#${MEMBER_STORAGE_FILE_SIZE_ID}`).should(
              'contain',
              formatFileSize(file.size),
            );
            cy.get(`#${MEMBER_STORAGE_FILE_UPDATED_AT_ID}`).should(
              'contain',
              new Date(file.updatedAt).toLocaleString(),
            );
            cy.get(`#${MEMBER_STORAGE_PARENT_FOLDER_ID}`).should(
              'contain',
              file.parent?.name ?? 'No Parent',
            );
          });
      });
      if (i !== numberPages - 1) {
        cy.get('button[aria-label="Go to next page"]').click();
      }
    }
  });
});

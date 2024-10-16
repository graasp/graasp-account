import { CookieKeys, MemberStorageItem, PublicProfile } from '@graasp/sdk';

import {
  CURRENT_MEMBER,
  MEMBER_PUBLIC_PROFILE,
  MEMBER_STORAGE_ITEM_RESPONSE,
} from '../fixtures/members';
import {
  mockCreatePassword,
  mockDeleteCurrentMember,
  mockEditCurrentMember,
  mockEditPublicProfile,
  mockExportData,
  mockGetCurrentMember,
  mockGetCurrentMemberAvatar,
  mockGetMemberStorageFiles,
  mockGetOwnProfile,
  mockGetPasswordStatus,
  mockGetStorage,
  mockPostAvatar,
  mockSignInRedirection,
  mockSignOut,
  mockUpdateEmail,
  mockUpdatePassword,
} from './server';
import { MemberForTest } from './utils';

declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(args: {
        currentMember?: MemberForTest | null;
        hasPassword?: boolean;
        currentProfile?: PublicProfile;
        storageAmountInBytes?: number;
        getCurrentMemberError?: boolean;
        getCurrentProfileError?: boolean;
        editMemberError?: boolean;
        editPublicProfileError?: boolean;
        getAvatarUrlError?: boolean;
        postAvatarError?: boolean;
        updatePasswordError?: boolean;
        createPasswordError?: boolean;
        updateEmailError?: boolean;
        files?: MemberStorageItem[];
        getMemberStorageFilesError?: boolean;
        exportDataError?: boolean;
      }): Chainable;
    }
  }
}

Cypress.Commands.add(
  'setUpApi',
  ({
    currentMember = CURRENT_MEMBER,
    hasPassword = false,
    currentProfile = MEMBER_PUBLIC_PROFILE,
    getCurrentMemberError = false,
    getCurrentProfileError = false,
    editMemberError = false,
    editPublicProfileError = false,
    getAvatarUrlError = false,
    postAvatarError = false,
    updatePasswordError = false,
    createPasswordError = false,
    updateEmailError = false,
    exportDataError = false,
    storageAmountInBytes = 10000,
    files = MEMBER_STORAGE_ITEM_RESPONSE,
    getMemberStorageFilesError = false,
  } = {}) => {
    const cachedCurrentMember = JSON.parse(JSON.stringify(currentMember));
    const cachedCurrentProfile = JSON.parse(JSON.stringify(currentProfile));
    const cachedCurrentStorageFiles = JSON.parse(JSON.stringify(files));
    // hide cookie banner by default
    cy.setCookie(CookieKeys.AcceptCookies, 'true');

    mockGetCurrentMember(cachedCurrentMember, getCurrentMemberError);
    mockGetOwnProfile(cachedCurrentProfile, getCurrentProfileError);

    mockSignInRedirection();

    mockSignOut();

    mockEditCurrentMember(cachedCurrentMember, editMemberError);
    mockEditPublicProfile(cachedCurrentProfile, editPublicProfileError);
    mockGetCurrentMemberAvatar(currentMember, getAvatarUrlError);

    mockPostAvatar(postAvatarError);

    mockUpdatePassword(updatePasswordError);
    mockUpdateEmail(updateEmailError);

    mockGetStorage(storageAmountInBytes);
    mockGetMemberStorageFiles(
      cachedCurrentStorageFiles,
      getMemberStorageFilesError,
    );
    mockExportData(exportDataError);
    mockDeleteCurrentMember();

    mockGetPasswordStatus(hasPassword);
    mockCreatePassword(createPasswordError);
  },
);

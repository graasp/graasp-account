/// <reference types="cypress" />
import { CookieKeys } from '@graasp/sdk';

import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';
import {
  mockEditMember,
  mockGetAvatarUrl,
  mockGetCurrentMember,
  mockGetMember,
  mockPostAvatar,
  mockSignInRedirection,
  mockSignOut,
  mockUpdatePassword,
} from './server';

Cypress.Commands.add(
  'setUpApi',
  ({
    members = Object.values(MEMBERS),
    currentMember = CURRENT_MEMBER,
    getCurrentMemberError = false,
    editMemberError = false,
    getAvatarUrlError = false,
    postAvatarError = false,
    updatePasswordError = false,
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    // hide cookie banner by default
    cy.setCookie(CookieKeys.AcceptCookies, 'true');

    mockGetMember(cachedMembers);

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockSignInRedirection();

    mockSignOut();

    mockEditMember(cachedMembers, editMemberError);

    mockGetAvatarUrl(members, getAvatarUrlError);

    mockPostAvatar(postAvatarError);

    mockUpdatePassword(members, updatePasswordError);
  },
);

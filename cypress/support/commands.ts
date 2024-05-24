/// <reference types="cypress" />
import { CookieKeys } from '@graasp/sdk';

import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';
import {
  mockEditMember,
  mockGetCurrentMember,
  mockGetCurrentMemberAvatar,
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
    const cachedCurrentMember = JSON.parse(JSON.stringify(currentMember));

    // hide cookie banner by default
    cy.setCookie(CookieKeys.AcceptCookies, 'true');

    mockGetMember(cachedMembers);

    mockGetCurrentMember(cachedCurrentMember, getCurrentMemberError);

    mockSignInRedirection();

    mockSignOut();

    mockEditMember(cachedCurrentMember, editMemberError);

    mockGetCurrentMemberAvatar(currentMember, getAvatarUrlError);

    mockPostAvatar(postAvatarError);

    mockUpdatePassword(members, updatePasswordError);
  },
);

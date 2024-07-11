/// <reference types="cypress" />
import { CookieKeys } from '@graasp/sdk';

import {
  CURRENT_MEMBER,
  MEMBERS,
  MEMBER_PUBLIC_PROFILE,
} from '../fixtures/members';
import {
  mockEditMember,
  mockEditPublicProfile,
  mockGetCurrentMember,
  mockGetCurrentMemberAvatar,
  mockGetMember,
  mockGetOwnProfile,
  mockPostAvatar,
  mockSignInRedirection,
  mockSignOut,
  mockUpdateEmail,
  mockUpdatePassword,
} from './server';

Cypress.Commands.add(
  'setUpApi',
  ({
    members = Object.values(MEMBERS),
    currentMember = CURRENT_MEMBER,
    currentProfile = MEMBER_PUBLIC_PROFILE,
    getCurrentMemberError = false,
    getCurrentProfileError = false,
    editMemberError = false,
    editPublicProfileError = false,
    getAvatarUrlError = false,
    postAvatarError = false,
    updatePasswordError = false,
    updateEmailError = false,
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));
    const cachedCurrentMember = JSON.parse(JSON.stringify(currentMember));
    const cachedCurrentProfile = JSON.parse(JSON.stringify(currentProfile));

    // hide cookie banner by default
    cy.setCookie(CookieKeys.AcceptCookies, 'true');

    mockGetCurrentMember(cachedCurrentMember, getCurrentMemberError);
    mockGetMember(cachedMembers);
    mockGetOwnProfile(cachedCurrentProfile, getCurrentProfileError);

    mockSignInRedirection();

    mockSignOut();

    mockEditMember(cachedCurrentMember, editMemberError);
    mockEditPublicProfile(cachedCurrentProfile, editPublicProfileError);
    mockGetCurrentMemberAvatar(currentMember, getAvatarUrlError);

    mockPostAvatar(postAvatarError);

    mockUpdatePassword(members, updatePasswordError);
    mockUpdateEmail(updateEmailError);
  },
);

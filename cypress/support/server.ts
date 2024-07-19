import { API_ROUTES } from '@graasp/query-client';
import {
  CompleteMember,
  HttpMethod,
  Member,
  PublicProfile,
  buildSignInPath,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import { CURRENT_MEMBER, MEMBER_PUBLIC_PROFILE } from '../fixtures/members';
import { ID_FORMAT, MemberForTest } from './utils';

const {
  buildGetMemberRoute,
  buildGetCurrentMemberRoute,
  SIGN_OUT_ROUTE,
  buildPatchMemberRoute,
  buildUploadAvatarRoute,
  buildUpdateMemberPasswordRoute,
  buildGetOwnPublicProfileRoute,
  buildPatchPublicProfileRoute,
  buildPostMemberEmailUpdateRoute,
  buildGetMemberStorageRoute,
} = API_ROUTES;

export const SIGN_IN_PATH = buildSignInPath({
  host: Cypress.env('VITE_GRAASP_AUTH_HOST'),
});
const API_HOST = Cypress.env('VITE_GRAASP_API_HOST');

export const redirectionReply = {
  headers: { 'content-type': 'text/html' },
  statusCode: StatusCodes.OK,
  body: '<h1>Mock Auth Page</h1>',
};

export const mockGetOwnProfile = (
  publicProfile = MEMBER_PUBLIC_PROFILE,
  shouldThrowError = false,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: `${API_HOST}/${buildGetOwnPublicProfileRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }
      return reply({ statusCode: StatusCodes.OK, body: publicProfile });
    },
  ).as('getOwnProfile');
};

export const mockEditPublicProfile = (
  currentProfile: PublicProfile,
  shouldThrowError: boolean,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Patch,
      url: `${API_HOST}/${buildPatchPublicProfileRoute()}`,
    },
    ({ reply, body }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ ...currentProfile, ...body });
    },
  ).as('editPublicProfile');
};

export const mockGetCurrentMember = (
  currentMember = CURRENT_MEMBER,
  shouldThrowError = false,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }

      // might reply empty user when signed out
      return reply({ statusCode: StatusCodes.OK, body: currentMember });
    },
  ).as('getCurrentMember');
};

export const mockGetMember = (members: Member[]): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: new RegExp(`${API_HOST}/${buildGetMemberRoute(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const memberId = url.slice(API_HOST.length).split('/')[2];
      const member = members.find((m) => m.id === memberId);

      // member does not exist in db
      if (!member) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: member,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMember');
};

export const mockEditMember = (
  currentMember: CompleteMember,
  shouldThrowError: boolean,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Patch,
      url: new RegExp(`${API_HOST}/${buildPatchMemberRoute(ID_FORMAT)}`),
    },
    ({ reply, body }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ ...currentMember, ...body });
    },
  ).as('editMember');
};

export const mockSignInRedirection = (): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      pathname: '/signin',
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signInRedirection');
};

export const mockSignOut = (): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: new RegExp(SIGN_OUT_ROUTE),
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signOut');
};

export const mockGetCurrentMemberAvatar = (
  currentMember: MemberForTest | null,
  shouldThrowError: boolean,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: new RegExp(
        `${API_HOST}/members/${ID_FORMAT}/avatar/(original|large|medium|small)\\?replyUrl\\=true`,
      ),
    },
    ({ reply }) => {
      if (shouldThrowError || !currentMember) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const { thumbnail } = currentMember;
      if (!thumbnail) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }
      return reply(thumbnail);
    },
  ).as('getCurrentMemberAvatarUrl');
};

export const mockGetStorage = (storageAmountInBytes: number): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: new RegExp(`${API_HOST}/${buildGetMemberStorageRoute()}`),
    },
    ({ reply }) =>
      reply({ current: storageAmountInBytes, maximum: 5368709120 }),
  ).as('getCurrentMemberStorage');
};

export const mockPostAvatar = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      url: new RegExp(`${buildUploadAvatarRoute()}`),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ statusCode: StatusCodes.OK });
    },
  ).as('uploadAvatar');
};

export const mockUpdatePassword = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Patch,
      url: new RegExp(`${API_HOST}/${buildUpdateMemberPasswordRoute()}`),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply('update password');
    },
  ).as('updatePassword');
};

export const mockUpdateEmail = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      url: new RegExp(`${API_HOST}/${buildPostMemberEmailUpdateRoute()}`),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('updateMemberEmail');
};

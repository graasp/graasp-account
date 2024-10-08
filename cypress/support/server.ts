import { API_ROUTES } from '@graasp/query-client';
import {
  CompleteMember,
  HttpMethod,
  PublicProfile,
  buildSignInPath,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import {
  CURRENT_MEMBER,
  MEMBER_PUBLIC_PROFILE,
  MEMBER_STORAGE_ITEM_RESPONSE,
} from '../fixtures/members';
import { ID_FORMAT, MemberForTest } from './utils';

const {
  buildGetCurrentMemberRoute,
  SIGN_OUT_ROUTE,
  buildPatchCurrentMemberRoute,
  buildUploadAvatarRoute,
  buildPatchMemberPasswordRoute,
  buildGetOwnPublicProfileRoute,
  buildPatchPublicProfileRoute,
  buildPostMemberEmailUpdateRoute,
  buildGetMemberStorageRoute,
  buildExportMemberDataRoute,
  buildDeleteCurrentMemberRoute,
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
      pathname: `/${buildGetCurrentMemberRoute()}`,
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

export const mockEditCurrentMember = (
  currentMember: CompleteMember,
  shouldThrowError: boolean,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Patch,
      pathname: `/${buildPatchCurrentMemberRoute()}`,
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

export const mockGetMemberStorageFiles = (
  files = MEMBER_STORAGE_ITEM_RESPONSE,
  shouldThrowError = false,
): void => {
  const route = new RegExp(`${API_HOST}/members/current/storage/files`);
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: route,
    },
    ({ url, reply }) => {
      const params = new URL(url).searchParams;

      const page = window.parseInt(params.get('page') ?? '1');
      const pageSize = window.parseInt(params.get('pageSize') ?? '10', 10);

      const result = files.slice((page - 1) * pageSize, page * pageSize);

      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }
      return reply({
        statusCode: StatusCodes.OK,
        body: {
          data: result,
          pagination: {
            page,
            pageSize,
          },
          totalCount: files.length,
        },
      });
    },
  ).as('getMemberStorageFiles');
};

export const mockPostAvatar = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      pathname: `/${buildUploadAvatarRoute()}`,
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
      pathname: `/${buildPatchMemberPasswordRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply('update password');
    },
  ).as('updatePassword');
};

export const mockCreatePassword = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      pathname: `/password`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply('create password');
    },
  ).as('createPassword');
};

export const mockUpdateEmail = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      pathname: `/${buildPostMemberEmailUpdateRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('updateMemberEmail');
};

export const mockExportData = (shouldThrowError: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      pathname: `/${buildExportMemberDataRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('exportData');
};

export const mockDeleteCurrentMember = (): void => {
  cy.intercept(
    {
      method: HttpMethod.Delete,
      pathname: `/${buildDeleteCurrentMemberRoute()}`,
    },
    ({ reply }) => reply({ statusCode: StatusCodes.NO_CONTENT }),
  ).as('deleteCurrentMember');
};

export const mockGetPasswordStatus = (hasPassword: boolean): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      pathname: `/members/current/password/status`,
    },
    ({ reply }) => reply({ hasPassword }),
  ).as('getPasswordStatus');
};

import { API_ROUTES } from '@graasp/query-client';
import {
  CompleteMember,
  HttpMethod,
  Member,
  buildSignInPath,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import { CURRENT_MEMBER } from '../fixtures/members';
import { ID_FORMAT, MemberForTest } from './utils';

const {
  buildGetMember,
  GET_CURRENT_MEMBER_ROUTE,
  SIGN_OUT_ROUTE,
  buildPatchMember,
  buildUploadAvatarRoute,
  buildUpdateMemberPasswordRoute,
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

export const mockGetCurrentMember = (
  currentMember = CURRENT_MEMBER,
  shouldThrowError = false,
): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: `${API_HOST}/${GET_CURRENT_MEMBER_ROUTE}`,
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
      url: new RegExp(`${API_HOST}/${buildGetMember(ID_FORMAT)}$`),
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
      url: new RegExp(`${API_HOST}/${buildPatchMember(ID_FORMAT)}`),
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
  currentMember: MemberForTest,
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
      if (shouldThrowError) {
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

export const mockUpdatePassword = (
  _members: Member[],
  shouldThrowError: boolean,
): void => {
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

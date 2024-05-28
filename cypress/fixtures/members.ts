import { Member, MemberFactory } from '@graasp/sdk';

import { MemberForTest } from '../support/utils';
import { AVATAR_LINK } from './thumbnails/links';

export const CURRENT_MEMBER = MemberFactory();
export const BOB = MemberFactory({
  id: 'e1a0a49d-dfc4-466e-8379-f3846cda91e2',
  name: 'BOB',
  email: 'bob@gmail.com',
  createdAt: '2021-04-13 14:56:34.749946',
});
export const MEMBERS: {
  [name: string]: Member & {
    nameValid?: boolean;
  };
} = {
  WRONG_NAME_TOO_SHORT: {
    id: '201621f0-848b-413f-80f9-25937a56c008',
    name: 'w',
    email: 'graasp@graasp.org',
    nameValid: false,
  },
  WRONG_NAME_TOO_LONG: {
    id: 'a7e428e9-86d3-434a-b611-d930cf8380ec',
    name: 'qwertyuio pasdfghjklzx cvbnmqwertr tyuiopa sdfghjklzxcvbnmqwe',
    email: 'graasp@graasp.org',
    nameValid: false,
  },
  VALID_NAME: BOB,
};

export const MEMBER_WITH_AVATAR: MemberForTest = {
  ...MemberFactory({
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    extra: { lang: 'en', hasAvatar: true },
  }),
  // this only exists for test
  thumbnail: AVATAR_LINK,
};

import { Member, MemberFactory } from '@graasp/sdk';

// eslint-disable-next-line import/prefer-default-export
export const CURRENT_MEMBER = MemberFactory();
export const BOB = MemberFactory({
  id: 'e1a0a49d-dfc4-466e-8379-f3846cda91e2',
  name: 'BOB',
  email: 'bob@gmail.com',
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
    name: 'qwertyuiopasdfghjklzxcvbnmqwert',
    email: 'graasp@graasp.org',
    nameValid: false,
  },
  VALID_NAME: BOB,
};

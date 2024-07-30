import { Member, MemberFactory, PublicProfile } from '@graasp/sdk';

import { MemberForTest } from '../support/utils';
import { AVATAR_LINK } from './thumbnails/links';

export const CURRENT_MEMBER = MemberFactory({ extra: { lang: 'en' } });
export const BOB = MemberFactory({
  id: 'e1a0a49d-dfc4-466e-8379-f3846cda91e2',
  name: 'BOB',
  email: 'bob@gmail.com',
  createdAt: '2021-04-13 14:56:34.749946',
  enableSaveActions: true,
  extra: { lang: 'en', emailFreq: 'always', hasAvatar: true },
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

export const MEMBER_PUBLIC_PROFILE: PublicProfile = {
  id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
  member: BOB,
  bio: 'text',
  twitterID: 'twitter_handle',
  facebookID: 'fb_handle',
  linkedinID: 'linkedin_handle',
  createdAt: '2021-04-13 14:56:34.749946',
  updatedAt: '2021-04-13 14:56:34.749946',
  visibility: false,
};
export const MEMBER_EMPTY_PUBLIC_PROFILE: PublicProfile = {
  id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
  member: BOB,
  bio: '',
  twitterID: '',
  facebookID: '',
  linkedinID: '',
  createdAt: '2021-04-13 14:56:34.749946',
  updatedAt: '2021-04-13 14:56:34.749946',
  visibility: false,
};

export const MEMBER_STORAGE_ITEM_RESPONSE = {
  data: [
    {
      id: 'b1bd68a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd68a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd78a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd58a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd48a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd18a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd28a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd98a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: 'b0bd08a8-6071-418c-9599-18ecb76b7b22',
      name: 'Document1.pdf',
      size: 102400,
      updatedAt: '2024-07-01T12:00:00Z',
      path: '3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22',
      parent: {
        id: '3ac6dfb2-92f0-4013-b933-1a32d5687870',
        name: 'Documents',
      },
    },
    {
      id: '4de1b419-38cd-46e5-81f2-916150819175',
      name: 'Image1.png',
      size: 204800,
      updatedAt: '2024-07-02T14:30:00Z',
      path: '28c849e2_604b_430c_aa0a_7d2630291b07.4de1b419_38cd_46e5_81f2_916150819175',
      parent: {
        id: '28c849e2-604b-430c-aa0a-7d2630291b07',
        name: 'Images',
      },
    },
    {
      id: '4de1b419-38cd-46e5-81f2-916150819175',
      name: 'Image1.png',
      size: 204800,
      updatedAt: '2024-07-02T14:30:00Z',
      path: '28c849e2_604b_430c_aa0a_7d2630291b07.4de1b419_38cd_46e5_81f2_916150819175',
      parent: {
        id: '28c849e2-604b-430c-aa0a-7d2630291b07',
        name: 'Images',
      },
    },
    {
      id: '4de1b419-38cd-46e5-81f2-916150819175',
      name: 'Image1.png',
      size: 204800,
      updatedAt: '2024-07-02T14:30:00Z',
      path: '4de1b419_38cd_46e5_81f2_916150819175',
    },
    {
      id: '4de1b419-38cd-46e5-81f2-916150819175',
      name: 'Image1.png',
      size: 204800,
      updatedAt: '2024-07-02T14:30:00Z',
      path: '4de1b419_38cd_46e5_81f2_916150819175',
    },
  ],
  totalCount: 13,
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

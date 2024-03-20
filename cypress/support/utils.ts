import { CompleteMember } from '@graasp/sdk';

export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

// TODO: not ideal, to change?
export type MemberForTest = CompleteMember & { thumbnails?: string };

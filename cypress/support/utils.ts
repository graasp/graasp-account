import { CompleteMember } from '@graasp/sdk';

export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

// TODO: not ideal, to change?
export type MemberForTest = CompleteMember & { thumbnail?: string };
export const getDataCy = (dataCy: string): string => `[data-cy="${dataCy}"]`;
export const buildDataCySelector = (
  dataCy: string,
  htmlSelector: string,
): string => `${getDataCy(dataCy)} ${htmlSelector}`;

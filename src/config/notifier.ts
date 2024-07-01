import { toast } from 'react-toastify';

import { Notifier, routines } from '@graasp/query-client';
import { FAILURE_MESSAGES } from '@graasp/translations';

import { AxiosError } from 'axios';

import i18n from './i18n';
import { CHANGE_PLAN_SUCCESS_MESSAGE } from './messages';

const {
  updatePasswordRoutine,
  postPublicProfileRoutine,
  patchPublicProfileRoutine,
  changePlanRoutine,
} = routines;

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

const getErrorMessageFromPayload = (
  payload?: Parameters<Notifier>[0]['payload'],
) => {
  if (payload?.error && payload.error instanceof AxiosError) {
    if (payload.error.isAxiosError) {
      return (
        payload.error.response?.data.message ??
        FAILURE_MESSAGES.UNEXPECTED_ERROR
      );
    }
  }
  return payload?.error?.message ?? FAILURE_MESSAGES.UNEXPECTED_ERROR;
};

const getSuccessMessageFromPayload = (payload?: SuccessPayload) =>
  payload?.message ?? 'The operation successfully proceeded';

export default ({
  type,
  payload,
}: {
  type: string;
  payload?: Payload;
}): void => {
  let message = null;
  switch (type) {
    // error messages
    case updatePasswordRoutine.FAILURE: {
      message = getErrorMessageFromPayload(payload);
      break;
    }

    // success messages
    case updatePasswordRoutine.SUCCESS: {
      message = getSuccessMessageFromPayload(payload);
      break;
    }
    case postPublicProfileRoutine.SUCCESS:
    case patchPublicProfileRoutine.SUCCESS: {
      message = i18n.t(
        payload?.message ?? 'The operation successfully proceeded',
      );
      break;
    }

    // progress messages
    case changePlanRoutine.SUCCESS: {
      message = CHANGE_PLAN_SUCCESS_MESSAGE;
      break;
    }

    default:
  }

  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message));
  }
};

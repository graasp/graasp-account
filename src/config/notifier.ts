import { toast } from 'react-toastify';

import { Notifier, routines } from '@graasp/query-client';
import { FAILURE_MESSAGES } from '@graasp/translations';

import axios from 'axios';

import { NS } from './constants';
import i18n from './i18n';
import { CHANGE_PLAN_SUCCESS_MESSAGE } from './messages';

const {
  updatePasswordRoutine,
  postPublicProfileRoutine,
  patchPublicProfileRoutine,
  changePlanRoutine,
  updateEmailRoutine,
  exportMemberDataRoutine,
} = routines;

export const getErrorMessageFromPayload = (
  payload?: Parameters<Notifier>[0]['payload'],
): string => {
  if (payload?.error && axios.isAxiosError(payload.error)) {
    return (
      (payload.error.response?.data as { message: string } | undefined)
        ?.message ?? FAILURE_MESSAGES.UNEXPECTED_ERROR
    );
  }

  return payload?.error?.message ?? FAILURE_MESSAGES.UNEXPECTED_ERROR;
};

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

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
  const successMessage = 'EXPORT_SUCCESS_MESSAGE';
  const failureMessage = 'EXPORT_ERROR_MESSAGE';
  switch (type) {
    // error messages
    case updatePasswordRoutine.FAILURE:
    case updateEmailRoutine.FAILURE: {
      message = getErrorMessageFromPayload(payload);
      break;
    }
    case exportMemberDataRoutine.FAILURE: {
      message = i18n.t(payload?.message ?? failureMessage);
      break;
    }

    // success messages
    case updatePasswordRoutine.SUCCESS: {
      message = getSuccessMessageFromPayload(payload);
      break;
    }
    case postPublicProfileRoutine.SUCCESS:
    case updateEmailRoutine.SUCCESS:
    case patchPublicProfileRoutine.SUCCESS:
    case exportMemberDataRoutine.SUCCESS: {
      message = i18n.t(payload?.message ?? successMessage);
      break;
    }

    // progress messages
    case changePlanRoutine.SUCCESS: {
      message = CHANGE_PLAN_SUCCESS_MESSAGE;
      break;
    }

    default:
  }
  const t = i18n.getFixedT(null, NS.Messages);
  // error notification
  if (payload?.error && message) {
    toast.error(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      t(message),
    );
  }
  // success notification
  else if (message) {
    toast.success(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      t(message),
    );
  }
};

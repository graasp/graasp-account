import { toast } from 'react-toastify';

import { Notifier, routines } from '@graasp/query-client';

import i18n from './i18n';
import {
  CHANGE_PLAN_ERROR_MESSAGE,
  CHANGE_PLAN_SUCCESS_MESSAGE,
} from './messages';

const { changePlanRoutine } = routines;

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

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
    case changePlanRoutine.FAILURE: {
      message = CHANGE_PLAN_ERROR_MESSAGE;
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
  } else if (payload?.message) {
    toast.success(payload?.message);
  }
};

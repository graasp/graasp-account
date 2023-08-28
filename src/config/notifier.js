import { toast } from 'react-toastify';

import { routines } from '@graasp/query-client';

import i18n from './i18n';
import {
  CHANGE_PLAN_ERROR_MESSAGE,
  CHANGE_PLAN_SUCCESS_MESSAGE,
  ERROR_MESSAGE_HEADER,
  SUCCESS_MESSAGE_HEADER,
} from './messages';

const { changePlanRoutine } = routines;

export default ({ type, payload }) => {
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
    toast.error(i18n.t(ERROR_MESSAGE_HEADER), i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(SUCCESS_MESSAGE_HEADER), i18n.t(message));
  }
};

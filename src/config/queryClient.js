import { configureQueryClient } from '@graasp/query-client';

import { API_HOST } from './constants';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  useMutation,
  useQueryClient,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  notifier,
});
export {
  useQueryClient,
  mutations,
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
};

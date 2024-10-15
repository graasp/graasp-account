import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { BUILDER_ITEMS_PREFIX, ClientHostManager, Context } from '@graasp/sdk';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { GRAASP_BUILDER_HOST } from './config/env';
import { routeTree } from './routeTree.gen';

// import * as serviceWorker from './serviceWorker';

ClientHostManager.getInstance()
  .addPrefix(Context.Builder, BUILDER_ITEMS_PREFIX)
  .addHost(Context.Builder, new URL(GRAASP_BUILDER_HOST));

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

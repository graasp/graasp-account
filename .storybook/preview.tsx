import * as React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@graasp/ui';

import type { Preview, StoryContext } from '@storybook/react';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import type { PartialStoryFn } from 'storybook/internal/types';

import '../src/app.css';
import '../src/config/i18n';

const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for the components',
    defaultValue: 'ltr',
    toolbar: {
      items: [
        { value: 'ltr', title: 'left-to-right' },
        { value: 'rtl', title: 'right-to-left' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes,
  decorators: [
    (Story: PartialStoryFn, { parameters }: StoryContext) => {
      const {
        initialEntries = ['/'],
        initialIndex,
        routes = ['/'],
        routeParams = {},
      } = parameters?.router || {};

      const rootRoute = createRootRoute();

      const children = routes.map((path: string) =>
        createRoute({
          path,
          getParentRoute: () => rootRoute,
          component: Story,
        }),
      );

      rootRoute.addChildren(children);

      // Ensure initialEntries are strings
      const formattedInitialEntries = initialEntries.map((entry: string) => {
        // If the entry includes parameters, replace them with the provided values
        return Object.keys(routeParams).reduce((acc, key) => {
          return acc.replace(`:${key}`, routeParams[key]);
        }, entry);
      });

      const router = createRouter({
        history: createMemoryHistory({
          initialEntries: formattedInitialEntries,
          initialIndex,
        }),
        routeTree: rootRoute,
        context: routeParams,
      });

      return <RouterProvider router={router} />;
    },
    (Story, { globals }) => {
      return (
        <ThemeProvider
          theme={{
            ...theme,
            direction: globals.direction,
            palette: {
              ...theme.palette,
              mode: globals.theme,
            },
          }}
        >
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

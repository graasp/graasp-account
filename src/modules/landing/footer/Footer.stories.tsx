import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Footer } from './Footer';

const meta = {
  component: Footer,
  args: {
    onChangeLang: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

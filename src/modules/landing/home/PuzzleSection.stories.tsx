import { Meta, StoryObj } from '@storybook/react';

import { PuzzleSection } from './PuzzleSection';

const meta = {
  component: PuzzleSection,
} satisfies Meta<typeof PuzzleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

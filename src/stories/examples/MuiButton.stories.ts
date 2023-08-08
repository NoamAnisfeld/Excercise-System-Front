import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './MuiButton';

const meta = {
  title: 'MUI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MuiButton: Story = {
  args: {
    label: 'Button label',
  },
}
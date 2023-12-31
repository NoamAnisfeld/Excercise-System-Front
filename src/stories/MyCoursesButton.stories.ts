import type { Meta, StoryObj } from '@storybook/react';

import MainOptionsButton from '../components/main/MainOptionsButton';

const meta = {
  title: 'MainOptionsButton',
  component: MainOptionsButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainOptionsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    title: "כל הקורסים",
    linkTo: "."
  }
}
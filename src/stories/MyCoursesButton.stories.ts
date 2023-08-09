import type { Meta, StoryObj } from '@storybook/react';

import MyCoursesButton from '../components/MyCoursesButton';

const meta = {
  title: 'MyCoursesButton',
  component: MyCoursesButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyCoursesButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {}
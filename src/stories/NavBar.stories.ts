import type { Meta, StoryObj } from '@storybook/react';

import NavBar from '../components/NavBar';

const meta = {
  title: 'NavBar',
  component: NavBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    username: 'ExampleUser',
  }
}

export const LoggedOut: Story = {
  args: {
    username: null,
  }
}
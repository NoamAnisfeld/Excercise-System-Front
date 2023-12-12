import type { Meta, StoryObj } from '@storybook/react'
import EditableText from '../components/EditableText'
import { sleep } from '../utils';
import React from 'react';

function WrapperComponent() {

    const [text, setText] = React.useState('original text');

    return React.createElement(
        EditableText,
        {
            currentText: text,
            onSave: async (newText) => {
                await sleep(1000);
                setText(newText);
                return;
            },
        }
    );

}

const meta = {
    title: 'EditableText',
    component: WrapperComponent,
    tags: ['autodocs'],
} satisfies Meta<typeof EditableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {}
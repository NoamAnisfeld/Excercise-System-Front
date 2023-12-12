import type { Meta, StoryObj } from '@storybook/react'
import SubmissionUploader from '../components/submissions/SubmissionUploader'

const meta = {
    title: 'SubmissionUploader',
    component: SubmissionUploader,
    tags: ['autodocs'],
} satisfies Meta<typeof SubmissionUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    args: {
        onSubmit: (file: File) => {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            if (confirm(`Download ${file.name} ?`))
                a.click();
        }
    }
}
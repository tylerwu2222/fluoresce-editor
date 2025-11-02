import type { Meta, StoryObj } from '@storybook/react';
import Editor from '../src/components/Editor/Editor';

const meta: Meta<typeof Editor> = {
  title: 'Editor',
  component: Editor,
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  args: {
    shouldAnimate: true,
    backgroundColor: "#fff",
    placeholder: "type lab notes..."
  }
};

export const CustomStyle: Story = {
  args: {
    backgroundColor: "#61a957",
    placeholder: "my notes"
  }
}; 
import type { Meta, StoryObj } from '@storybook/react';
import Editor from '../../src/components/Editor';

const meta: Meta<typeof Editor> = {
  title: 'Editor',
  component: Editor,
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Default: Story = {
};

export const CustomStyle: Story = {
}; 
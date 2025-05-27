import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../src/components/InlineNodes/Text';

const meta: Meta<typeof Text> = {
  title: 'InlineNodes/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Bold: Story = {
  args: {
    node: {
      id: '1',
      type: 'bold',
      text: 'Bold text'
    }
  }
};

export const Italic: Story = {
  args: {
    node: {
      id: '2',
      type: 'italic',
      text: 'Italic text'
    }
  }
};

export const Underline: Story = {
  args: {
    node: {
      id: '3',
      type: 'underline',
      text: 'Underlined text'
    }
  }
};

export const Strikethrough: Story = {
  args: {
    node: {
      id: '4',
      type: 'strikethrough',
      text: 'Strikethrough text'
    }
  }
}; 
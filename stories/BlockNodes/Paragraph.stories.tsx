import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../../src/components/BlockNodes/Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'BlockNodes/Paragraph',
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    node: {
      id: '1',
      type: 'paragraph',
      text: 'This is a paragraph with some text.',
      styles: { marginBottom: '1rem' }
    }
  }
}; 
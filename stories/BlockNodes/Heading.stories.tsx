import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../src/components/BlockNodes/Heading';

const meta: Meta<typeof Heading> = {
  title: 'BlockNodes/Heading',
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    node: {
      id: '1',
      type: 'heading1',
      text: 'Heading 1',
      styles: { marginBottom: '1rem' }
    }
  }
};

export const H2: Story = {
  args: {
    node: {
      id: '2',
      type: 'heading2',
      text: 'Heading 2',
      styles: { marginBottom: '1rem' }
    }
  }
}; 
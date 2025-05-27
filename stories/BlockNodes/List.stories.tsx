import type { Meta, StoryObj } from '@storybook/react';
import { List } from '../../src/components/BlockNodes/List';

const meta: Meta<typeof List> = {
  title: 'BlockNodes/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    node: {
      id: '1',
      type: 'list',
      items: [
        { id: '2', type: 'listItem', text: 'First item' },
        { id: '3', type: 'listItem', text: 'Second item' },
        { id: '4', type: 'listItem', text: 'Third item' }
      ],
      styles: { marginBottom: '1rem' }
    }
  }
}; 
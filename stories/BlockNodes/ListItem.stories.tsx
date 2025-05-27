import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../../src/components/BlockNodes/ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'BlockNodes/ListItem',
  component: ListItem,
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    node: {
      id: '1',
      type: 'listItem',
      text: 'List item text',
      styles: { marginBottom: '0.5rem' }
    }
  }
}; 
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../src/components/InlineNodes/Link';

const meta: Meta<typeof Link> = {
  title: 'InlineNodes/Link',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    node: {
      id: '1',
      type: 'link',
      text: 'Click me',
      props: {
        href: 'https://example.com'
      }
    }
  }
};

export const CustomStyle: Story = {
  args: {
    node: {
      id: '2',
      type: 'link',
      text: 'Custom styled link',
      props: {
        href: 'https://example.com'
      },
      styles: {
        color: '#ff0000',
        textDecoration: 'none',
        borderBottom: '1px dashed #ff0000'
      }
    }
  }
}; 
import { InlineNode } from '../types';

interface LinkProps {
  node: InlineNode;
}

export const Link = ({ node }: LinkProps) => {
  const { text, props, styles } = node;
  const { href = '#' } = props || {};

  const style = {
    color: '#0066cc',
    textDecoration: 'underline',
    cursor: 'pointer',
    ...styles
  };

  return (
    <a href={href} style={style}>
      {text}
    </a>
  );
};

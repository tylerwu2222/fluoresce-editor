import { InlineNode } from '../types';

interface TextProps {
  node: InlineNode;
}

export const Text = ({ node }: TextProps) => {
  const { text, type, styles } = node;
  
  const style = {
    fontWeight: type === 'bold' ? 'bold' : 'normal',
    fontStyle: type === 'italic' ? 'italic' : 'normal',
    textDecoration: [
      type === 'underline' && 'underline',
      type === 'strikethrough' && 'line-through'
    ].filter(Boolean).join(' '),
    ...styles
  };

  return <span style={style}>{text}</span>;
};

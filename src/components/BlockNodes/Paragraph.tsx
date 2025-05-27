import React from 'react';
import { ParagraphNode } from '../types';

interface ParagraphProps {
  node: ParagraphNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({ node }) => {
  return (
    <p style={node.styles}>
      {node.text}
    </p>
  );
};

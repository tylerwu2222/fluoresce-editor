import React from 'react';
import { HeadingNode } from '../types';
import { Tag } from '../Tag';

interface HeadingProps {
  node: HeadingNode;
}

export const Heading: React.FC<HeadingProps> = ({ node }) => {
  const level = parseInt(node.type.replace('heading', ''));
  const tag = `h${Math.min(Math.max(level, 1), 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <Tag as={tag} style={node.styles}>
      {node.text}
    </Tag>
  );
};

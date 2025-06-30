import React from 'react';
import { HeadingNode, HeadingTag } from '../types';
import { Tag } from '../Tag';

interface HeadingProps {
  node: HeadingNode;
}

export const Heading: React.FC<HeadingProps> = ({ node }) => {

  const formatHeading = (node: HeadingNode): HeadingTag => {
    const providedLevel = parseInt(node.type.replace('heading', ''));
    const validLevel = Math.min(Math.max(providedLevel, 1), 6);
    return `h${validLevel}` as HeadingTag;
  }

  const tag = formatHeading(node);
  
  return (
    <Tag as={tag} style={node.styles}>
      {node.text}
    </Tag>
  );
};

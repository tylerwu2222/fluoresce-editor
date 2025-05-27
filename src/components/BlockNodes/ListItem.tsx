import React from 'react';
import { ListItemNode } from '../types';

interface ListItemProps {
  node: ListItemNode;
}

export const ListItem: React.FC<ListItemProps> = ({ node }) => {
  return (
    <li style={node.styles}>
      {node.text}
    </li>
  );
};

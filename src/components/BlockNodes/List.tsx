import React from 'react';
import { ListNode } from '../types';
import { ListItem } from './ListItem';

interface ListProps {
  node: ListNode;
}

export const List: React.FC<ListProps> = ({ node }) => {
  return (
    <ul style={node.styles}>
      {node.items?.map((item) => (
        <ListItem key={item.id} node={item} />
      ))}
    </ul>
  );
};

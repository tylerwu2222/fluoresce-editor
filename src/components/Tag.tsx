import React, { ElementType } from 'react';

interface TagProps {
  as: ElementType;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const Tag: React.FC<TagProps> = ({ as, children, style, ...props }) => {
  return React.createElement(as, { style, ...props }, children);
}; 
import React from 'react';
import { hexToRgba } from '../../../utils/color';
import './SlashMenuOption.css';


export type SlashMenuOptionProps = {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
};

export function SlashMenuOption({ isSelected, onClick, onMouseEnter, children, backgroundColor, textColor }: SlashMenuOptionProps) {
  const selectedBackground = textColor 
    ? (textColor === "#ffffff" || textColor === "white" 
        ? hexToRgba("#ffffff", 0.2) 
        : hexToRgba("#000000", 0.1))
    : undefined;

  return (
    <div
      className={`slash-menu-option${isSelected ? ' selected' : ''}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        ...(textColor && { color: textColor }),
        ...(isSelected && selectedBackground && { background: selectedBackground }),
      }}
    >
      {children}
    </div>
  );
} 
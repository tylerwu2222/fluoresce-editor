import React from 'react';
import './SlashMenuOption.css';


export type SlashMenuOptionProps = {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  children: React.ReactNode;
};

export function SlashMenuOption({ isSelected, onClick, onMouseEnter, children }: SlashMenuOptionProps) {
  return (
    <div
      className={`slash-menu-option${isSelected ? ' selected' : ''}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 
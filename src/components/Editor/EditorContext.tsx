import React from 'react';

export interface EditorContextType {
  isContentSelected: boolean;
  isBoldToggleOn: boolean;
  isItalicToggleOn: boolean;
  isUnderlineToggleOn: boolean;
  isStrikethroughToggleOn: boolean;
  isCodeToggleOn: boolean;
  isEditorActive: boolean;
}

export const EditorContext = React.createContext<EditorContextType>({
  isContentSelected: false,
  isBoldToggleOn: false,
  isItalicToggleOn: false,
  isUnderlineToggleOn: false,
  isStrikethroughToggleOn: false,
  isCodeToggleOn: false,
  isEditorActive: false,
}); 
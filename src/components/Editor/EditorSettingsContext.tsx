import React from 'react';

export interface EditorSettings {
  shouldAnimate: boolean;
  isEditorHovered: boolean;
  readOnly?: boolean;
  fontSize?: string;
  setFontSize?: (fontSize: string) => void;
  backgroundColor?: string;
  textColor?: string;
}

export const EditorSettingsContext = React.createContext<EditorSettings>({
  shouldAnimate: true,
  isEditorHovered: false,
  readOnly: false,
  fontSize: undefined,
  setFontSize: undefined,
  backgroundColor: undefined,
  textColor: undefined,
}); 
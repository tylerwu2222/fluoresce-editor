import React from 'react';

export interface EditorSettings {
  shouldAnimate: boolean;
  isEditorHovered: boolean;
}

export const EditorSettingsContext = React.createContext<EditorSettings>({
  shouldAnimate: true,
  isEditorHovered: false,
}); 
import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { EditorContext } from '../../Editor/EditorContext';

export default function EditorStatePlugin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editor] = useLexicalComposerContext();
  const [isContentSelected, setIsContentSelected] = React.useState(false);
  const [isBoldToggleOn, setIsBoldToggleOn] = React.useState(false);
  const [isItalicToggleOn, setIsItalicToggleOn] = React.useState(false);
  const [isStrikethroughToggleOn, setIsStrikethroughToggleOn] = React.useState(false);
  const [isUnderlineToggleOn, setIsUnderlineToggleOn] = React.useState(false);
  const [isCodeToggleOn, setIsCodeToggleOn] = React.useState(false);
  const [isEditorActive, setIsEditorActive] = React.useState(false);

  React.useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsContentSelected(!selection.isCollapsed());
          setIsBoldToggleOn(selection.hasFormat('bold'));
          setIsItalicToggleOn(selection.hasFormat('italic'));
          setIsStrikethroughToggleOn(selection.hasFormat('strikethrough'));
          setIsUnderlineToggleOn(selection.hasFormat('underline'));
          setIsCodeToggleOn(selection.hasFormat('code'));
        } else {
          setIsContentSelected(false);
          setIsBoldToggleOn(false);
          setIsItalicToggleOn(false);
          setIsStrikethroughToggleOn(false);
          setIsUnderlineToggleOn(false);
          setIsCodeToggleOn(false);
        }
      });
    });
    
    const editorElement = editor.getRootElement();
    const handleFocus = () => setIsEditorActive(true);
    const handleBlur = () => setIsEditorActive(false);

    if (editorElement) {
      editorElement.addEventListener('focusin', handleFocus);
      editorElement.addEventListener('focusout', handleBlur);
    }
    
    return () => {
      unregister();
      if (editorElement) {
        editorElement.removeEventListener('focusin', handleFocus);
        editorElement.removeEventListener('focusout', handleBlur);
      }
    };
  }, [editor]);

  return (
    <EditorContext.Provider
      value={{
        isContentSelected,
        isBoldToggleOn,
        isItalicToggleOn,
        isStrikethroughToggleOn,
        isUnderlineToggleOn,
        isCodeToggleOn,
        isEditorActive,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
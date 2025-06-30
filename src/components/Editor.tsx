// Editor.tsx
import React from "react";
import {
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { EditorState } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

const theme = {
  // Customize styling or leave empty to use default
};

const initialConfig = {
  namespace: "MyLabNotebook",
  theme,
  onError(error: Error) {
    throw error;
  },
  editorState: null,
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder">Type lab notes…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState: EditorState) => {
          // You can extract JSON here and connect with external state
          editorState.read(() => {
            const json = editorState.toJSON();
            console.log("Editor State:", json);
          });
        }}
      />
    </LexicalComposer>
  );
}
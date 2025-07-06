// Editor.tsx
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState } from "lexical";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { QuoteNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import "./Editor.css";

const themeDefault = {
  text: {
    bold: "defaultBold",
    italic: "defaultItalic",
  },
};

interface EditorProps {
  placeholder?: string;
}

export default function Editor({
  placeholder = "Type lab notes…",
}: EditorProps) {
  const initialConfig = {
    namespace: "FluoresceEditor",
    theme: themeDefault,
    onError(error: Error) {
      throw error;
    },
    editorState: null,
    nodes: [
      CodeNode,
      CodeHighlightNode,
      HeadingNode,
      HorizontalRuleNode,
      LinkNode,
      ListItemNode,
      ListNode,
      QuoteNode,
    ],
  };

  return (
    <div className="editorContainer">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editorInput" />}
          placeholder={<div className="editorPlaceholder">{placeholder}</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const json = editorState.toJSON();
              console.log("Editor State:", json);
            });
          }}
        />
        <MarkdownShortcutPlugin />
      </LexicalComposer>
    </div>
  );
}

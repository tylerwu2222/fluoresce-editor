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
import ToolbarPlugin from "../plugins/ToolbarPlugin/ToolbarPlugin";
import "./Editor.css";
import { EditorSettingsContext } from './EditorSettingsContext';
import EditorStatePlugin from "../plugins/EditorStatePlugin/EditorStatePlugin";
import ExitBlockOnEmptyPlugin from "../plugins/ExitBlockOnEmptyPlugin/ExitBlockOnEmptyPlugin";

const themeDefault = {
  text: {
    bold: "defaultBold",
    italic: "defaultItalic",
    underline: "defaultUnderline",
    strikethrough: "defaultStrikethrough",
    code: "defaultCode",
  },
};

interface EditorProps {
  placeholder?: string;
  shouldAnimate?: boolean;
}

export default function Editor({
  placeholder = "Type lab notes…",
  shouldAnimate = true,
}: EditorProps) {
  const [isHovered, setIsHovered] = React.useState(false);
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
    <div
      className="editorContainer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <EditorSettingsContext.Provider value={{ shouldAnimate, isEditorHovered: isHovered }}>
        <LexicalComposer initialConfig={initialConfig}>
          <EditorStatePlugin>
            <ExitBlockOnEmptyPlugin />
            <ToolbarPlugin />
            <div className={`editorContentArea`}>
              <RichTextPlugin
                contentEditable={<ContentEditable className="editorInput" />}
                placeholder={<div className="editorPlaceholder">{placeholder}</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </EditorStatePlugin>
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
      </EditorSettingsContext.Provider>
    </div>
  );
}

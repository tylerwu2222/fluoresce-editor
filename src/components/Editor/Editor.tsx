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
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { QuoteNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import ToolbarPlugin from "../plugins/ToolbarPlugin/ToolbarPlugin";
import SlashMenuPlugin from "../plugins/SlashMenuPlugin/SlashMenuPlugin";
import { EditorSettingsContext } from "./EditorSettingsContext";
import EditorStatePlugin from "../plugins/EditorStatePlugin/EditorStatePlugin";
import ExitBlockOnEmptyPlugin from "../plugins/ExitBlockOnEmptyPlugin/ExitBlockOnEmptyPlugin";
import { CategoricalMaterialNode } from "../nodes/MaterialNodes/CategoricalMaterialNode/CategoricalMaterialNode";
import { NumericalMaterialNode } from "../nodes/MaterialNodes/NumericalMaterialNode/NumericalMaterialNode";
import {
  getContrastTextColor,
  hexToRgba,
} from "../../utils/color";
import "./Editor.css";

const themeDefault = {
  // inline styles
  text: {
    bold: "defaultBold",
    italic: "defaultItalic",
    underline: "defaultUnderline",
    strikethrough: "defaultStrikethrough",
    code: "defaultCode",
  },
  // block styles
  code: "editorCode",
  quote: "editorQuote",
};

interface EditorProps {
  placeholder?: string;
  shouldAnimate?: boolean;
  backgroundColor?: string;
  fontSize?: string;
}

export default function Editor({
  placeholder = "Type lab notes…",
  shouldAnimate = true,
  backgroundColor,
  fontSize: initialFontSize,
}: EditorProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<string>(initialFontSize || "15px");
  
  React.useEffect(() => {
    if (initialFontSize !== undefined) {
      setFontSize(initialFontSize);
    }
  }, [initialFontSize]);
  
  const textColor = backgroundColor
    ? getContrastTextColor(backgroundColor)
    : undefined;
  const textColorHex =
    textColor === "black"
      ? "#000000"
      : textColor === "white"
      ? "#ffffff"
      : textColor || "#000000";
  const placeholderColor = textColor ? hexToRgba(textColorHex, 0.6) : undefined;
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
      CategoricalMaterialNode,
      NumericalMaterialNode,
    ],
  };

  return (
    <div
      className="editorContainer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <EditorSettingsContext.Provider
        value={{ 
          shouldAnimate, 
          isEditorHovered: isHovered, 
          fontSize, 
          setFontSize,
          backgroundColor,
          textColor: textColorHex,
        }}
      >
        <LexicalComposer initialConfig={initialConfig}>
          <EditorStatePlugin>
            <ExitBlockOnEmptyPlugin />
            <ToolbarPlugin />
            <ListPlugin />
            <SlashMenuPlugin />
            {(textColor || fontSize) && (
              <style>{`
                .editorInput {
                  ${textColor ? `caret-color: ${textColorHex};` : ''}
                  ${fontSize ? `font-size: ${fontSize};` : ''}
                }
                ${fontSize ? `
                .editorPlaceholder {
                  font-size: ${fontSize};
                }
                ` : ''}
              `}</style>
            )}
            <div
              className={`editorContentArea`}
              style={{
                ...(backgroundColor && { backgroundColor }),
                ...(textColor && { color: textColor, borderColor: textColor }),
              }}
            >
              <RichTextPlugin
                contentEditable={<ContentEditable className="editorInput" />}
                placeholder={
                  <div
                    className="editorPlaceholder"
                    style={{
                      ...(placeholderColor && { color: placeholderColor }),
                    }}
                  >
                    {placeholder}
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </EditorStatePlugin>
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState: EditorState) => {
              editorState.read(() => {
                const json = editorState.toJSON();
                // consNole.log("Editor State:", json);
              });
            }}
          />
          <MarkdownShortcutPlugin />
        </LexicalComposer>
      </EditorSettingsContext.Provider>
    </div>
  );
}

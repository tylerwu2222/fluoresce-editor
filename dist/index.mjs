// src/components/Editor.tsx
import {
  LexicalComposer
} from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { jsx } from "react/jsx-runtime";
var theme = {
  // Customize styling or leave empty to use default
};
function Editor() {
  const initialConfig = {
    namespace: "FluoresceEditor",
    theme,
    onError(error) {
      throw error;
    },
    editorState: null
  };
  return /* @__PURE__ */ jsx(LexicalComposer, { initialConfig, children: /* @__PURE__ */ jsx(
    PlainTextPlugin,
    {
      contentEditable: /* @__PURE__ */ jsx(ContentEditable, { className: "editor-input" }),
      placeholder: /* @__PURE__ */ jsx("div", { className: "editor-placeholder", children: "Type lab notes\u2026" }),
      ErrorBoundary: LexicalErrorBoundary
    }
  ) });
}
export {
  Editor
};

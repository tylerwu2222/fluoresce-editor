"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Editor: () => Editor
});
module.exports = __toCommonJS(index_exports);

// src/components/Editor.tsx
var import_LexicalComposer = require("@lexical/react/LexicalComposer");
var import_LexicalPlainTextPlugin = require("@lexical/react/LexicalPlainTextPlugin");
var import_LexicalContentEditable = require("@lexical/react/LexicalContentEditable");
var import_LexicalErrorBoundary = require("@lexical/react/LexicalErrorBoundary");
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_LexicalComposer.LexicalComposer, { initialConfig, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_LexicalPlainTextPlugin.PlainTextPlugin,
    {
      contentEditable: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_LexicalContentEditable.ContentEditable, { className: "editor-input" }),
      placeholder: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "editor-placeholder", children: "Type lab notes\u2026" }),
      ErrorBoundary: import_LexicalErrorBoundary.LexicalErrorBoundary
    }
  ) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Editor
});

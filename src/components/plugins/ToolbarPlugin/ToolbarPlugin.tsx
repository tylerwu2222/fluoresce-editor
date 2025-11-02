import * as React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import { EditorSettingsContext } from "../../Editor/EditorSettingsContext";
import { EditorContext } from "../../Editor/EditorContext";
import { createBlockTypeMap, getNodeAction } from "../../Editor/editorConfig";
import { getTextFormatOptions, executeTextFormat } from "./toolbarConfig";

import "./ToolbarPlugin.css";

const BlockTypeMap = createBlockTypeMap();

// Generate font sizes from 8px to 72px
const fontSizes = Array.from({ length: 17 }, (_, i) => `${4 * i + 8}px`);

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const { shouldAnimate, fontSize, setFontSize } = React.useContext(EditorSettingsContext);
  const editorContext = React.useContext(EditorContext);
  const {
    isEditorActive,
    isContentSelected,
  } = editorContext;
  const [blockType, setBlockType] = React.useState("paragraph");

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Update block type
          const anchorNode = selection.anchor.getNode();
          let element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : $findMatchingParent(anchorNode, (e) => {
                  const parent = e.getParent();
                  return parent !== null && $isRootOrShadowRoot(parent);
                });

          if (element) {
            if ($isListNode(element)) {
              const parentList = element as ListNode;
              const type = parentList.getListType();
              setBlockType(type);
            } else {
              const type = $isHeadingNode(element)
                ? element.getTag()
                : $isCodeNode(element)
                ? "code"
                : element.getType();
              if (BlockTypeMap.has(type)) {
                setBlockType(type);
              } else {
                setBlockType("paragraph");
              }
            }
          }
        }
      });
    });
  }, [editor]);

  const onBlockTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBlockType = e.target.value;
    const action = getNodeAction(newBlockType);
    if (action) {
      action(editor);
      
      // For inline nodes, reset dropdown to current block type since they don't change block context
      const isInlineNode = newBlockType === 'numerical-material' || newBlockType === 'categorical-material';
      if (!isInlineNode) {
        setBlockType(newBlockType);
      }
      // For inline nodes, blockType will naturally reset to current block via the update listener
    }
  };

  // Get text formatting options
  const textFormatOptions = getTextFormatOptions();

  return (
    <div
      className={`toolbar ${shouldAnimate ? "toolbar-animate" : ""} ${
        !(isContentSelected || isEditorActive) ? "faded" : ""
      }`}
    >
      <select value={blockType} onChange={onBlockTypeChange}>
        {Array.from(BlockTypeMap.keys()).map((key) => (
          <option key={key} value={key}>
            {BlockTypeMap.get(key)}
          </option>
        ))}
      </select>
      
      <select
        value={fontSize || "15px"}
        onChange={(e) => setFontSize?.(e.target.value)}
        style={{
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      
      {/* Dynamic text formatting buttons */}
      {textFormatOptions.map((option) => (
        <button
          key={option.key}
          onClick={() => executeTextFormat(editor, option.command)}
          className={"toolbar-item " + (option.getActiveState?.(editorContext) ? "active" : "")}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

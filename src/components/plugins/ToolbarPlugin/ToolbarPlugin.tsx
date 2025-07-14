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
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import { EditorSettingsContext } from "../../Editor/EditorSettingsContext";
import { EditorContext } from "../../Editor/EditorContext";

import "./ToolbarPlugin.css";

const BlockTypeMap = new Map([
  ["paragraph", "Paragraph"],
  ["h1", "Heading 1"],
  ["h2", "Heading 2"],
  ["h3", "Heading 3"],
  ["ul", "Bullet List"],
  ["ol", "Numbered List"],
  ["quote", "Quote"],
  ["code", "Code Block"],
]);

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const { shouldAnimate } = React.useContext(EditorSettingsContext);
  const {
    isEditorActive,
    isContentSelected,
    isBoldToggleOn,
    isItalicToggleOn,
    isUnderlineToggleOn,
    isStrikethroughToggleOn,
    isCodeToggleOn,
  } = React.useContext(EditorContext);
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

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const formatCode = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  const onBlockTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBlockType = e.target.value;
    setBlockType(newBlockType);
    switch (newBlockType) {
      case "paragraph":
        formatParagraph();
        break;
      case "h1":
        formatHeading("h1");
        break;
      case "h2":
        formatHeading("h2");
        break;
      case "h3":
        formatHeading("h3");
        break;
      case "ul":
        formatBulletList();
        break;
      case "ol":
        formatNumberedList();
        break;
      case "quote":
        formatQuote();
        break;
      case "code":
        formatCode();
        break;
      default:
        break;
    }
  };

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
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={"toolbar-item " + (isBoldToggleOn ? "active" : "")}
      >
        B
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={"toolbar-item " + (isItalicToggleOn ? "active" : "")}
      >
        I
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={"toolbar-item " + (isUnderlineToggleOn ? "active" : "")}
      >
        U
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={"toolbar-item " + (isStrikethroughToggleOn ? "active" : "")}
      >
        S
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        className={"toolbar-item " + (isCodeToggleOn ? "active" : "")}
      >
        {"<>"}
      </button>
    </div>
  );
}

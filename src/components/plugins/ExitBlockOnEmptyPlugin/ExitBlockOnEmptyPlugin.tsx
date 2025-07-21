import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_HIGH,
  $createParagraphNode,
} from "lexical";
import { $isListNode } from "@lexical/list";
import { $isCodeNode } from "@lexical/code";

export default function ExitBlockOnEmptyPlugin() {
  const [editor] = useLexicalComposerContext();

  // only exit block for certain node types
  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false;
        const node = selection.anchor.getNode();
        // List item
        if ($isListNode(node.getParent()) && node.getTextContent() === "") {
          editor.update(() => {
            const paragraph = $createParagraphNode();
            node.replace(paragraph);
            paragraph.select();
          });
          return true;
        }
        // Code block
        if ($isCodeNode(node.getParent()) && node.getTextContent() === "") {
          editor.update(() => {
            const paragraph = $createParagraphNode();
            node.replace(paragraph);
            paragraph.select();
          });
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
} 
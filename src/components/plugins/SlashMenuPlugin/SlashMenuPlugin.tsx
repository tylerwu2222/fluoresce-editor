import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  KEY_DOWN_COMMAND,
  LexicalEditor,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import { SlashMenu, SlashMenuOptionData } from "./SlashMenu";
import { getAllOptions } from "../../Editor/editorConfig";

function getCursorRect(): DOMRect | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  return range.getBoundingClientRect();
}

// Convert node options to slash menu format
const allBlockOptions: SlashMenuOptionData[] = getAllOptions().map(option => ({
  key: option.key,
  label: option.label,
  action: option.action
}));

export default function SlashMenuPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const ignoreCloseRef = useRef(false);

  useEffect(() => {
    setSelected(0);
  }, [search]);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      if (ignoreCloseRef.current) {
        ignoreCloseRef.current = false;
        return;
      }
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          setShowMenu(false);
          return;
        }

        const anchor = selection.anchor;
        const node = anchor.getNode();
        const textContent = node.getTextContent();
        const slashIndex = textContent.lastIndexOf('/', anchor.offset - 1);

        if (
          $isTextNode(node) &&
          slashIndex !== -1
        ) {
          const rect = getCursorRect();
          if (rect) {
            setMenuPos({ left: rect.left, top: rect.bottom });
            setShowMenu(true);
            setSearch(textContent.substring(slashIndex + 1, anchor.offset));
          }
        } else {
          setShowMenu(false);
        }
      });
    });
    return unregister;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if (!showMenu) return false;

        if (event.key === "Escape") {
          event.preventDefault();
          setShowMenu(false);
          ignoreCloseRef.current = true;
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [showMenu, editor]);

  if (!showMenu || !menuPos) return null;

  return (
    <SlashMenu
      menuRef={menuRef}
      close={() => setShowMenu(false)}
      menuPos={menuPos}
      search={search}
      options={allBlockOptions}
      selected={selected}
      setSelected={setSelected}
    />
  );
}

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LexicalEditor, $getSelection, $isRangeSelection, $isTextNode } from "lexical";
import { SlashMenuOption } from "./SlashMenuOption";
import "./SlashMenu.css";

export type SlashMenuOptionData = {
  key: string;
  label: string;
  action: (editor: LexicalEditor) => void;
};

type SlashMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
  close: () => void;
  menuPos: { left: number; top: number };
  options: SlashMenuOptionData[];
  search: string;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export function SlashMenu({ menuRef, close, menuPos, options, search, selected, setSelected }: SlashMenuProps) {
  const [editor] = useLexicalComposerContext();

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const getCurrentOption = () => filteredOptions[selected];

  // Consolidated function to remove slash text and execute action
  const executeOption = (option: SlashMenuOptionData) => {
    // Remove the slash and search text
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor.getNode();
        if ($isTextNode(anchor)) {
          const text = anchor.getTextContent();
          anchor.setTextContent(text.replace(/\/[^ ]* ?/, ''));
        }
      }
    });
    
    // Execute the action and close menu
    option.action(editor);
    close();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, close]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (filteredOptions.length === 0) return;
      
      if (event.key === "ArrowDown") {
        setSelected((prev) => (prev + 1) % filteredOptions.length);
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if (event.key === "ArrowUp") {
        setSelected(
          (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if (event.key === "Enter") {
        const currentOption = getCurrentOption();
        if (currentOption) {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          executeOption(currentOption);
        }
      }
    };
    
    // Use capture phase to ensure we get the event before Lexical
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [filteredOptions, selected, setSelected, editor, close]);

  return createPortal(
    <div
      ref={menuRef}
      className="slash-menu"
      style={{ left: menuPos.left, top: menuPos.top, position: "fixed" }}
    >
      <div className="slash-menu-options-wrapper">
        {filteredOptions.map((option, i) => (
          <SlashMenuOption
            key={option.key}
            isSelected={selected === i}
            onMouseEnter={() => setSelected(i)}
            onClick={() => {
              executeOption(option);
            }}
          >
            {option.label}
          </SlashMenuOption>
        ))}
      </div>
      <div className="slash-menu-footer">
        <span>Type '/{search}' on the page</span>
      </div>
    </div>,
    document.body
  );
}

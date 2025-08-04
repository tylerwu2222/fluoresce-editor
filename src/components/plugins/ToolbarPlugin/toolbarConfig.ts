import { LexicalEditor, FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";

// Types for text formatting configuration
export interface TextFormatOption {
  key: string;
  label: string;
  icon: string;
  command: TextFormatType;
  getActiveState?: (context: any) => boolean;
}

// Text formatting options configuration
export const textFormatOptions: TextFormatOption[] = [
  {
    key: "bold",
    label: "Bold",
    icon: "B",
    command: "bold",
    getActiveState: (context) => context.isBoldToggleOn
  },
  {
    key: "italic",
    label: "Italic", 
    icon: "I",
    command: "italic",
    getActiveState: (context) => context.isItalicToggleOn
  },
  {
    key: "underline",
    label: "Underline",
    icon: "U", 
    command: "underline",
    getActiveState: (context) => context.isUnderlineToggleOn
  },
  {
    key: "strikethrough",
    label: "Strikethrough",
    icon: "S",
    command: "strikethrough", 
    getActiveState: (context) => context.isStrikethroughToggleOn
  },
  {
    key: "code",
    label: "Code",
    icon: "<>",
    command: "code",
    getActiveState: (context) => context.isCodeToggleOn
  }
];

// Helper function to execute text format command
export const executeTextFormat = (editor: LexicalEditor, command: TextFormatType) => {
  editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
};

// Get all available text format options
export const getTextFormatOptions = () => textFormatOptions; 
import { LexicalEditor } from "lexical";
import { $createParagraphNode } from "lexical";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection, $insertNodes } from "lexical";
import { CategoricalMaterialNode } from "../nodes/MaterialNodes/CategoricalMaterialNode/CategoricalMaterialNode";
import { NumericalMaterialNode } from "../nodes/MaterialNodes/NumericalMaterialNode/NumericalMaterialNode";

// Types for node configuration
export type NodeOptionType = 'block' | 'inline' | 'list';

export interface NodeOption {
  key: string;
  label: string;
  type: NodeOptionType;
  action: (editor: LexicalEditor) => void;
}

// Helper functions for different action types
const createBlockTypeAction = (nodeCreator: () => any) => (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, nodeCreator);
    }
  });
};

const createListAction = (command: any) => (editor: LexicalEditor) => {
  editor.dispatchCommand(command, undefined);
};

const createInlineNodeAction = (nodeCreator: () => any) => (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = nodeCreator();
      $insertNodes([node]);
    }
  });
};

// All available node options
export const availableNodeOptions: NodeOption[] = [
  { 
    key: "paragraph", 
    label: "Paragraph", 
    type: "block",
    action: createBlockTypeAction(() => $createParagraphNode()) 
  },
  { 
    key: "h1", 
    label: "Heading 1", 
    type: "block",
    action: createBlockTypeAction(() => $createHeadingNode('h1')) 
  },
  { 
    key: "h2", 
    label: "Heading 2", 
    type: "block",
    action: createBlockTypeAction(() => $createHeadingNode('h2')) 
  },
  { 
    key: "h3", 
    label: "Heading 3", 
    type: "block",
    action: createBlockTypeAction(() => $createHeadingNode('h3')) 
  },
  { 
    key: "ul", 
    label: "Bullet List", 
    type: "list",
    action: createListAction(INSERT_UNORDERED_LIST_COMMAND) 
  },
  { 
    key: "ol", 
    label: "Numbered List", 
    type: "list",
    action: createListAction(INSERT_ORDERED_LIST_COMMAND) 
  },
  { 
    key: "quote", 
    label: "Quote", 
    type: "block",
    action: createBlockTypeAction(() => $createQuoteNode()) 
  },
  { 
    key: "code", 
    label: "Code Block", 
    type: "block",
    action: createBlockTypeAction(() => $createCodeNode()) 
  },
  { 
    key: "numerical-material", 
    label: "Numerical Material", 
    type: "inline",
    action: createInlineNodeAction(() => new NumericalMaterialNode({
      material: "Temperature",
      color: "#e3f2fd",
      min: 0,
      max: 100,
      value: 25,
      unit: "°C"
    }))
  },
  { 
    key: "categorical-material", 
    label: "Categorical Material", 
    type: "inline",
    action: createInlineNodeAction(() => new CategoricalMaterialNode({
      material: "Status",
      color: "#f3e5f5",
      categories: ["Active", "Inactive", "Pending"],
      selected: "Active"
    }))
  },
];

// Helper functions to filter by type
export const getBlockOptions = () => availableNodeOptions.filter(opt => opt.type === 'block' || opt.type === 'list');
export const getInlineOptions = () => availableNodeOptions.filter(opt => opt.type === 'inline');
export const getAllOptions = () => availableNodeOptions;

// Create a map for toolbar dropdown (block types + inline nodes)
export const createBlockTypeMap = () => {
  const toolbarOptions = availableNodeOptions.filter(opt => opt.type === 'block' || opt.type === 'list' || opt.type === 'inline');
  return new Map(toolbarOptions.map(opt => [opt.key, opt.label]));
};

// Get action by key
export const getNodeAction = (key: string) => {
  const option = availableNodeOptions.find(opt => opt.key === key);
  return option?.action;
}; 
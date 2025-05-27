// types for block and inline nodes
type HeadingType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6";

export type FluoresceBlockType =
  | "paragraph"
  | HeadingType
  | "list"
  | "listItem";

export type FluoresceInlineType =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "link";

// base node to extend to specific node types
interface BaseNode {
  id: string;
  type: FluoresceBlockType | FluoresceInlineType;
  content?: BaseNode[]; // for inline content
  items?: BaseNode[]; // for list type items
  text?: string; // for text based nodes
  props?: Record<string, any>;
  styles?: Record<string, any>;
}

// specific node types
export interface ParagraphNode extends BaseNode {
  type: "paragraph";
  text: string;
}

export interface HeadingNode extends BaseNode {
  type: HeadingType;
  text: string;
}

export interface ListNode extends BaseNode {
  type: "list";
  items: ListItemNode[];
}

export interface ListItemNode extends BaseNode {
  type: "listItem";
  text: string;
}

// union node types
export interface BlockNode extends BaseNode {
  type: FluoresceBlockType;
  content?: InlineNode[] | BlockNode[]; // depending on block type
  
}

export interface InlineNode extends BaseNode {
  type: FluoresceInlineType;
  text: string;
}

export type FluoresceNode = BlockNode | InlineNode;
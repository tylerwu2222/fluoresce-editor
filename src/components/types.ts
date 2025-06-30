// types for block and inline nodes
type Heading =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Block =
  | "paragraph"
  | Heading
  | "list"
  | "listItem";

export type Inline =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "link";

// base node to extend to specific node types
export interface Node {
  id: string;
  type: Block | Inline;
  content?: Node[]; // for inline content
  items?: Node[]; // for list type items
  text?: string; // for text based nodes
  props?: Record<string, any>;
  styles?: Record<string, any>;
}

// specific node types
export interface ParagraphNode extends Node {
  type: "paragraph";
  text: string;
}

export interface HeadingNode extends Node {
  type: Heading;
  text: string;
}

export interface ListNode extends Node {
  type: "list";
  items: ListItemNode[];
}

export interface ListItemNode extends Node {
  type: "listItem";
  text: string;
}

// union node types
export interface BlockNode extends Node {
  type: Block;
  content?: InlineNode[] | BlockNode[]; // depending on block type
  
}

export interface InlineNode extends Node {
  type: Inline;
  text: string;
}
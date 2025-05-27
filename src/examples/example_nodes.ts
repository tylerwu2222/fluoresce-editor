import { FluoresceNode } from "../components/types";

export const exampleNodes: FluoresceNode[] = [
  { id: "1", type: "heading1", text: "This is a heading" },
  { id: "2", type: "paragraph", text: "Start typing here..." },
  {
    id: "3",
    type: "paragraph",
    content: [
      { id: "3.1", type: "bold", text: "This is a bold text" },
      { id: "3.2", type: "italic", text: "This is an italic text" },
      { id: "3.3", type: "underline", text: "This is an underlined text" },
      {
        id: "3.4",
        type: "strikethrough",
        text: "This is a strikethrough text",
      },
    ],
  },
  {
    id: "4",
    type: "list",
    items: [
      { id: "4.1", type: "listItem", text: "This is a list item" }, 
      { id: "4.2", type: "listItem", text: "This is another list item" },
    ],
  },
];

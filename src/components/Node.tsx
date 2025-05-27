import React from "react";
import { FluoresceNode } from "./types";

interface NodeProps {
  node: FluoresceNode;
  onChange?: (content: string) => void;
}

export default function Node({ node, onChange }: NodeProps) {
  if (node.type === "paragraph") {
    return <div>{node.text}</div>;
  }
  if (node.type === "heading1") {
    return <h1>{node.text}</h1>;
  }
  if (node.type === "heading2") {
    return <h2>{node.text}</h2>;
  }
  if (node.type === "heading3") {
    return <h3>{node.text}</h3>;
  }
  if (node.type === "heading4") {
    return <h4>{node.text}</h4>;
  }
  if (node.type === "heading5") {
    return <h5>{node.text}</h5>;
  }
  if (node.type === "heading6") {
    return <h6>{node.text}</h6>;
  }
}

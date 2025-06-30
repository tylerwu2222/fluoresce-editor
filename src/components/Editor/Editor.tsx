import React, { useState } from "react";
import { Node } from "../types";
import Node from "../Node";
import { exampleNodes } from "../../examples/example_nodes";

export const Editor = () => {

  // state representing blocks
  const [nodes, setNodes] = useState<Node[]>(exampleNodes)

  return <div>
    {nodes.map(node => (
      <Node key={node.id} node={node} />
    ))}
  </div>;
};
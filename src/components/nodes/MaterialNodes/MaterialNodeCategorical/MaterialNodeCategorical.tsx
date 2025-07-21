import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import type { JSX } from 'react';
import "../MaterialNode.css";

export type CategoricalMaterialPayload = {
  material: string;
  color: string;
  categories: string[];
  selected: string;
};

export type SerializedCategoricalMaterialNode = Spread<
  {
    material: string;
    color: string;
    categories: string[];
    selected: string;
    type: "categorical-material";
    version: 1;
  },
  SerializedLexicalNode
>;

export class CategoricalMaterialNode extends DecoratorNode<JSX.Element> {
  __material: string;
  __color: string;
  __categories: string[];
  __selected: string;

  static getType() { return "categorical-material"; }
  static clone(node: CategoricalMaterialNode) {
    return new CategoricalMaterialNode({
      material: node.__material,
      color: node.__color,
      categories: node.__categories,
      selected: node.__selected,
    }, node.__key);
  }

  constructor(payload: CategoricalMaterialPayload, key?: string) {
    super(key);
    this.__material = payload.material;
    this.__color = payload.color;
    this.__categories = payload.categories;
    this.__selected = payload.selected;
  }

  exportJSON(): SerializedCategoricalMaterialNode {
    return {
      type: "categorical-material",
      version: 1,
      material: this.__material,
      color: this.__color,
      categories: this.__categories,
      selected: this.__selected,
    };
  }

  static importJSON(serialized: SerializedCategoricalMaterialNode) {
    return new CategoricalMaterialNode(serialized);
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.style.display = "inline-flex";
    span.style.alignItems = "center";
    span.style.background = this.__color;
    span.style.borderRadius = "4px";
    span.style.padding = "2px 6px";
    return span;
  }

  updateDOM(): boolean { return false; }

  decorate(): JSX.Element {
    return <CategoricalMaterialComponent node={this} />;
  }
}

export function CategoricalMaterialComponent({ node, showMaterial = false }: { node: CategoricalMaterialNode, showMaterial?: boolean }) {
  // TODO: Add onChange logic to update selected in editor
  return (
    <span className="material-node" style={{ background: node.__color }}>
      <select value={node.__selected} style={{ marginRight: 6 }} disabled>
        {node.__categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {showMaterial && <span>{node.__material}</span>}
    </span>
  );
}

export function CategoricalMaterialPreview(props: {
  material: string;
  color: string;
  categories: string[];
  selected: string;
  showMaterial?: boolean;
}) {
  const { material, color, categories, selected, showMaterial = false } = props;
  return (
    <span className="material-node" style={{ background: color }}>
      <select value={selected} style={{ marginRight: 6 }} disabled>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {showMaterial && <span>{material}</span>}
    </span>
  );
}

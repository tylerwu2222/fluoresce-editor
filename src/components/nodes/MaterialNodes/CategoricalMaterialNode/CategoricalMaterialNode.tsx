import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import type { JSX } from "react";
import "../MaterialNode.css";

export type CategoricalMaterialNodePayload = {
  material: string;
  color: string;
  categories: string[];
  selected: string;
};

// serialized node for export/import
export type SerializedCategoricalMaterialNodeNode = Spread<
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

  static getType() {
    return "categorical-material";
  }
  static clone(node: CategoricalMaterialNode) {
    return new CategoricalMaterialNode(
      {
        material: node.__material,
        color: node.__color,
        categories: node.__categories,
        selected: node.__selected,
      },
      node.__key
    );
  }

  constructor(payload: CategoricalMaterialNodePayload, key?: string) {
    super(key);
    this.__material = payload.material;
    this.__color = payload.color;
    this.__categories = payload.categories;
    this.__selected = payload.selected;
  }

  exportJSON(): SerializedCategoricalMaterialNodeNode {
    return {
      type: "categorical-material",
      version: 1,
      material: this.__material,
      color: this.__color,
      categories: this.__categories,
      selected: this.__selected,
    };
  }

  static importJSON(serialized: SerializedCategoricalMaterialNodeNode) {
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

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return <CategoricalMaterialComponent node={this} />;
  }
}

export type CategoricalMaterialNodeProps = {
  material: string;
  color: string;
  categories: string[];
  selected: string;
  showMaterial?: boolean;
  onMaterialChange?: (selected: string) => void;
};

export function CategoricalMaterial(props: CategoricalMaterialNodeProps) {
  const {
    material,
    color,
    categories,
    selected,
    showMaterial = false,
    onMaterialChange,
  } = props;
  return (
    <span className="material-node" style={{ background: color }}>
      {showMaterial && (
        <span className="material-node-category-label">{material}</span>
      )}
      <select
        value={selected}
        onChange={
          onMaterialChange ? (e) => onMaterialChange(e.target.value) : undefined
        }
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </span>
  );
}

export function CategoricalMaterialComponent({
  node,
  showMaterial = false,
  onMaterialChange,
}: {
  node: CategoricalMaterialNode;
  showMaterial?: boolean;
  onMaterialChange?: (selected: string) => void;
}) {
  return (
    <CategoricalMaterial
      material={node.__material}
      color={node.__color}
      categories={node.__categories}
      selected={node.__selected}
      showMaterial={showMaterial}
      onMaterialChange={onMaterialChange}
    />
  );
}

export function CategoricalMaterialNodePreview(
  props: CategoricalMaterialNodeProps
) {
  return <CategoricalMaterial {...props} />;
}

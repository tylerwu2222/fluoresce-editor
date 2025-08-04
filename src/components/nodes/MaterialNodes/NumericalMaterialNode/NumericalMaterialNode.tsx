import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import type { JSX } from "react";
import "../MaterialNode.css";

export type NumericalMaterialNodePayload = {
  material: string;
  color: string;
  min: number;
  max: number;
  value: number;
  unit: string;
};

export type SerializedNumericalMaterialNode = Spread<
  {
    material: string;
    color: string;
    min: number;
    max: number;
    value: number;
    unit: string;
    type: "numerical-material";
    version: 1;
  },
  SerializedLexicalNode
>;

export class NumericalMaterialNode extends DecoratorNode<JSX.Element> {
  __material: string;
  __color: string;
  __min: number;
  __max: number;
  __value: number;
  __unit: string;

  static getType() {
    return "numerical-material";
  }
  static clone(node: NumericalMaterialNode) {
    return new NumericalMaterialNode(
      {
        material: node.__material,
        color: node.__color,
        min: node.__min,
        max: node.__max,
        value: node.__value,
        unit: node.__unit,
      },
      node.__key
    );
  }

  constructor(payload: NumericalMaterialNodePayload, key?: string) {
    super(key);
    this.__material = payload.material;
    this.__color = payload.color;
    this.__min = payload.min;
    this.__max = payload.max;
    this.__value = payload.value;
    this.__unit = payload.unit;
  }

  exportJSON(): SerializedNumericalMaterialNode {
    return {
      type: "numerical-material",
      version: 1,
      material: this.__material,
      color: this.__color,
      min: this.__min,
      max: this.__max,
      value: this.__value,
      unit: this.__unit,
    };
  }

  static importJSON(serialized: SerializedNumericalMaterialNode) {
    return new NumericalMaterialNode(serialized);
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
    return <NumericalMaterialComponent node={this} />;
  }
}

export type NumericalMaterialNodeProps = {
  material: string;
  color: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  showMaterial?: boolean;
  readOnly?: boolean;
  onValueChange?: (value: string) => void;
};

// actual node component used in the editor
export function NumericalMaterial(props: NumericalMaterialNodeProps) {
  return (
    <span className="material-node" style={{ background: props.color }}>
      <input
        className="material-node-numeric-input"
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        readOnly={props.readOnly}
        onChange={props.onValueChange ? (e) => props.onValueChange!(e.target.value) : undefined}
      />
      <span className="material-node-numeric-unit">{props.unit}</span>
      {props.showMaterial !== false && <span>{props.material}</span>}
    </span>
  );
}


// component wrapper used to preview the node in storybook
export function NumericalMaterialComponent({ node }: { node: NumericalMaterialNode }) {
  return (
    <NumericalMaterial
      material={node.__material}
      color={node.__color}
      min={node.__min}
      max={node.__max}
      value={node.__value}
      unit={node.__unit}
      showMaterial={true}
      readOnly={true}
    />
  );
}

export function NumericalMaterialNodePreview(props: NumericalMaterialNodeProps) {
  return <NumericalMaterial {...props} />;
}

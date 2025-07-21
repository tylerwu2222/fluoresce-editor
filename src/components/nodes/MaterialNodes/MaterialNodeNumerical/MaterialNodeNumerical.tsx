import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import type { JSX } from 'react';
import "../MaterialNode.css";

export type NumericalMaterialPayload = {
  material: string;
  color: string;
  min: number;
  max: number;
  value: number;
};

export type SerializedNumericalMaterialNode = Spread<
  {
    material: string;
    color: string;
    min: number;
    max: number;
    value: number;
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

  static getType() { return "numerical-material"; }
  static clone(node: NumericalMaterialNode) {
    return new NumericalMaterialNode({
      material: node.__material,
      color: node.__color,
      min: node.__min,
      max: node.__max,
      value: node.__value,
    }, node.__key);
  }

  constructor(payload: NumericalMaterialPayload, key?: string) {
    super(key);
    this.__material = payload.material;
    this.__color = payload.color;
    this.__min = payload.min;
    this.__max = payload.max;
    this.__value = payload.value;
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

  updateDOM(): boolean { return false; }

  decorate(): JSX.Element {
    return <NumericalMaterialComponent node={this} />;
  }
}

export function NumericalMaterialComponent({ node }: { node: NumericalMaterialNode }) {
  // TODO: Add onChange logic to update value in editor
  return (
    <span className="material-node" style={{ background: node.__color }}>
      <input
        type="number"
        min={node.__min}
        max={node.__max}
        value={node.__value}
        style={{ width: 60, marginRight: 6 }}
        readOnly
      />
      <span>{node.__material}</span>
    </span>
  );
}

export function NumericalMaterialPreview(props: {
  material: string;
  color: string;
  min: number;
  max: number;
  value: number;
}) {
  return (
    <span className="material-node" style={{ background: props.color }}>
      <input
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        style={{ width: 60, marginRight: 6 }}
        readOnly
      />
      <span>{props.material}</span>
    </span>
  );
}

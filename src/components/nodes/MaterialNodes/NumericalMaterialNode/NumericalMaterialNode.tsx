import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import type { JSX } from "react";
import { useMemo, useContext } from "react";
import {
  getContrastTextColor,
  DEFAULT_MATERIAL_COLOR,
} from "../../../../utils/color";
import { createLexicalNodeHelpers } from "../../../../utils/createLexicalNode";
import { CustomDropdown } from "../../../customElements/CustomDropdown/CustomDropdown";
import { CustomNumberInput } from "../../../customElements/CustomNumberInput/CustomNumberInput";
import { EditorSettingsContext } from "../../../Editor/EditorSettingsContext";

export type NumericalMaterialNodeProps = {
  material: string;
  color?: string;
  value: number;
  unit: string;
  showMaterial?: boolean;
  readOnly?: boolean;
  onValueChange?: (value: string) => void;
  fontFamily?: string;
  fontSize?: string;
  unitOptions?: string[];
  materialOptions?: string[];
  onUnitChange?: (unit: string) => void;
  onMaterialChange?: (material: string) => void;
  addUnitOption?: boolean;
  addMaterialOption?: boolean;
  onAddUnitOptionClick?: () => void;
  onAddMaterialOptionClick?: () => void;
};

// Serialization
const NUMERICAL_PAYLOAD_KEYS = [
  "material",
  "color",
  "value",
  "unit",
  "fontSize",
  "unitOptions",
  "materialOptions",
] as const;
export type SerializedNumericalMaterialNode = Spread<
  NumericalMaterialNodePayload & {
    type: "numerical-material";
    version: 1;
  },
  SerializedLexicalNode
>;
export type NumericalMaterialNodePayload = Pick<
  NumericalMaterialNodeProps,
  (typeof NUMERICAL_PAYLOAD_KEYS)[number]
>;
const numericalHelpers = createLexicalNodeHelpers<NumericalMaterialNodePayload>(
  "numerical-material",
  1,
  NUMERICAL_PAYLOAD_KEYS
);

export class NumericalMaterialNode extends DecoratorNode<JSX.Element> {
  __material!: string;
  __color!: string;
  __value!: number;
  __unit!: string;
  __fontSize?: string;
  __unitOptions?: string[];
  __materialOptions?: string[];

  static getType() {
    return "numerical-material";
  }
  static clone(node: NumericalMaterialNode) {
    return new NumericalMaterialNode(
      numericalHelpers.createPayload(node) as NumericalMaterialNodePayload,
      node.__key
    );
  }

  constructor(payload: NumericalMaterialNodePayload, key?: string) {
    super(key);
    numericalHelpers.assignPayload(this, payload, {
      color: DEFAULT_MATERIAL_COLOR,
    });
  }

  exportJSON(): SerializedNumericalMaterialNode {
    return numericalHelpers.createSerialized(
      this
    ) as SerializedNumericalMaterialNode;
  }

  static importJSON(serialized: SerializedNumericalMaterialNode) {
    return new NumericalMaterialNode(serialized);
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.style.display = "inline-flex";
    span.style.alignItems = "center";
    const resolvedColor = this.__color ?? DEFAULT_MATERIAL_COLOR;
    span.style.background = resolvedColor;
    span.style.borderRadius = "5px";
    span.style.padding = "0px 6px";
    span.style.fontFamily = '"Inter", sans-serif';
    span.style.fontWeight = "300";
    const textColor = getContrastTextColor(resolvedColor);
    span.style.color = textColor;
    return span;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return <NumericalMaterialComponent node={this} />;
  }

  setValue(value: number): void {
    const writable = this.getWritable();
    writable.__value = value;
  }

  setUnit(unit: string): void {
    const writable = this.getWritable();
    writable.__unit = unit;
  }

  setMaterial(material: string): void {
    const writable = this.getWritable();
    writable.__material = material;
  }
}

// actual node component used in the editor
export function NumericalMaterial(props: NumericalMaterialNodeProps) {
  const {
    material,
    color,
    value,
    unit,
    showMaterial = true,
    readOnly,
    onValueChange,
    fontFamily = '"Inter", sans-serif',
    fontSize = "1em",
    unitOptions,
    materialOptions,
    onUnitChange,
    onMaterialChange,
    addUnitOption,
    addMaterialOption,
    onAddUnitOptionClick,
    onAddMaterialOptionClick,
  } = props;
  const editorSettings = useContext(EditorSettingsContext);
  const isReadOnly = readOnly ?? editorSettings.readOnly ?? false;
  const resolvedColor = color ?? DEFAULT_MATERIAL_COLOR;
  const textColor = getContrastTextColor(resolvedColor);
  // Generate a stable, valid CSS ID by sanitizing material and color strings
  const inputId = useMemo(
    () =>
      `numerical-material-input-${material.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-${resolvedColor.replace(/[^a-zA-Z0-9]/g, "-")}-${value}`,
    [material, resolvedColor, value]
  );
  return (
    <>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: resolvedColor,
          padding: "0px 6px",
          borderRadius: "5px",
          fontFamily: fontFamily,
          fontWeight: 300,
          fontSize: fontSize,
        }}
      >
        <CustomNumberInput
          id={inputId}
          value={value}
          readOnly={isReadOnly}
          onChange={onValueChange}
          color={resolvedColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
        <span
          style={{
            margin: "0 0.5em",
          }}
        >
          <CustomDropdown
            options={unitOptions || [unit]}
            selected={unit}
            color={resolvedColor}
            textColor={textColor}
            onSelect={(value) => {
              if (onUnitChange) {
                onUnitChange(value);
              }
            }}
            readOnly={!onUnitChange || isReadOnly}
            fontFamily={fontFamily}
            fontSize={fontSize}
            showCaret={false}
            addOption={!isReadOnly && onUnitChange && addUnitOption}
            onAddOptionClick={onAddUnitOptionClick}
          />
        </span>
        {showMaterial !== false && (
          <CustomDropdown
            options={materialOptions || [material]}
            selected={material}
            color={resolvedColor}
            textColor={textColor}
            onSelect={(value) => {
              if (onMaterialChange) {
                onMaterialChange(value);
              }
            }}
            readOnly={!onMaterialChange || isReadOnly}
            fontFamily={fontFamily}
            fontSize={fontSize}
            showCaret={false}
            addOption={!isReadOnly && onMaterialChange && addMaterialOption}
            onAddOptionClick={onAddMaterialOptionClick}
          />
        )}
      </span>
    </>
  );
}

// component wrapper used to preview the node in storybook
export function NumericalMaterialComponent({
  node,
  showMaterial = true,
  onValueChange,
  onUnitChange,
  onMaterialChange,
}: {
  node: NumericalMaterialNode;
  showMaterial?: boolean;
  onValueChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
  onMaterialChange?: (material: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  const handleValueChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      editor.update(() => {
        const nodeKey = node.getKey();
        const currentNode = $getNodeByKey(nodeKey) as NumericalMaterialNode;
        if (currentNode) {
          currentNode.setValue(numValue);
        }
      });
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const handleUnitChange = (unit: string) => {
    editor.update(() => {
      const nodeKey = node.getKey();
      const currentNode = $getNodeByKey(nodeKey) as NumericalMaterialNode;
      if (currentNode) {
        currentNode.setUnit(unit);
      }
    });
    if (onUnitChange) {
      onUnitChange(unit);
    }
  };

  const handleMaterialChange = (material: string) => {
    editor.update(() => {
      const nodeKey = node.getKey();
      const currentNode = $getNodeByKey(nodeKey) as NumericalMaterialNode;
      if (currentNode) {
        currentNode.setMaterial(material);
      }
    });
    if (onMaterialChange) {
      onMaterialChange(material);
    }
  };

  return (
    <NumericalMaterial
      material={node.__material}
      color={node.__color}
      value={node.__value}
      unit={node.__unit}
      showMaterial={showMaterial}
      onValueChange={handleValueChange}
      onUnitChange={handleUnitChange}
      onMaterialChange={handleMaterialChange}
      fontSize={node.__fontSize}
      unitOptions={node.__unitOptions}
      materialOptions={node.__materialOptions}
    />
  );
}

export function NumericalMaterialNodePreview(
  props: NumericalMaterialNodeProps
) {
  return <NumericalMaterial {...props} />;
}

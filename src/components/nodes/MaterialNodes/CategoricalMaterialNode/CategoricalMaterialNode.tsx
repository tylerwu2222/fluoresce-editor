import { DecoratorNode, SerializedLexicalNode, Spread } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { useContext } from "react";
import type { JSX } from "react";
import { getContrastTextColor, DEFAULT_MATERIAL_COLOR } from "../../../../utils/color";
import { createLexicalNodeHelpers } from "../../../../utils/createLexicalNode";
import { CustomDropdown } from "../../../customElements/CustomDropdown/CustomDropdown";
import { EditorSettingsContext } from "../../../Editor/EditorSettingsContext";

export type CategoricalMaterialNodeProps = {
  material: string;
  color?: string;
  options: string[];
  selected: string;
  showMaterial?: boolean;
  readOnly?: boolean;
  onMaterialChange?: (selected: string) => void;
  fontFamily?: string;
  fontSize?: string;
  addOption?: boolean;
  onAddOptionClick?: () => void;
};

// Serialization
const CATEGORICAL_PAYLOAD_KEYS = [
  "material",
  "color",
  "options",
  "selected",
  "fontSize",
] as const;
export type CategoricalMaterialNodePayload = Pick<
  CategoricalMaterialNodeProps,
  typeof CATEGORICAL_PAYLOAD_KEYS[number]
>;
export type SerializedCategoricalMaterialNodeNode = Spread<
  CategoricalMaterialNodePayload & {
    type: "categorical-material";
    version: 1;
  },
  SerializedLexicalNode
>;
const categoricalHelpers = createLexicalNodeHelpers<CategoricalMaterialNodePayload>(
  "categorical-material",
  1,
  CATEGORICAL_PAYLOAD_KEYS
);

export class CategoricalMaterialNode extends DecoratorNode<JSX.Element> {
  __material!: string;
  __color!: string;
  __options!: string[];
  __selected!: string;
  __fontSize?: string;

  static getType() {
    return "categorical-material";
  }
  static clone(node: CategoricalMaterialNode) {
    return new CategoricalMaterialNode(
      categoricalHelpers.createPayload(node) as CategoricalMaterialNodePayload,
      node.__key
    );
  }

  constructor(payload: CategoricalMaterialNodePayload, key?: string) {
    super(key);
    categoricalHelpers.assignPayload(this, payload, {
      color: DEFAULT_MATERIAL_COLOR,
    });
  }

  exportJSON(): SerializedCategoricalMaterialNodeNode {
    return categoricalHelpers.createSerialized(this) as SerializedCategoricalMaterialNodeNode;
  }

  static importJSON(serialized: SerializedCategoricalMaterialNodeNode) {
    return new CategoricalMaterialNode(serialized);
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.style.display = "inline-flex";
    span.style.alignItems = "center";
    span.style.borderRadius = "4px";
    return span;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return <CategoricalMaterialComponent node={this} />;
  }

  setSelected(selected: string): void {
    const writable = this.getWritable();
    writable.__selected = selected;
  }
}

// actual node component used in the editor
export function CategoricalMaterial(props: CategoricalMaterialNodeProps) {
  const {
    material,
    color,
    options,
    selected,
    showMaterial = false,
    readOnly,
    onMaterialChange,
    fontFamily = '"Inter", sans-serif',
    fontSize = "1em",
    addOption,
    onAddOptionClick,
  } = props;
  const editorSettings = useContext(EditorSettingsContext);
  const resolvedColor = color ?? DEFAULT_MATERIAL_COLOR;
  const textColor = getContrastTextColor(resolvedColor);
  const isReadOnly = readOnly ?? editorSettings.readOnly ?? !onMaterialChange;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: 0,
        fontFamily: fontFamily,
        fontWeight: 300,
        fontSize: fontSize,
      }}
    >
      {showMaterial && (
        <span style={{ 
          color: textColor,
          marginInlineEnd: "6px",
        }}>
          {material}
        </span>
      )}
      <CustomDropdown
        options={options}
        selected={selected}
        color={resolvedColor}
        textColor={textColor}
        onSelect={(value) => {
          if (onMaterialChange) {
            onMaterialChange(value);
          }
        }}
        readOnly={isReadOnly}
        fontFamily={fontFamily}
        fontSize={fontSize}
        addOption={!isReadOnly && addOption}
        onAddOptionClick={onAddOptionClick}
      />
    </span>
  );
}

// component wrapper used to preview the node in storybook
export function CategoricalMaterialComponent({
  node,
  showMaterial = false,
  onMaterialChange,
}: {
  node: CategoricalMaterialNode;
  showMaterial?: boolean;
  onMaterialChange?: (selected: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  const handleMaterialChange = (selected: string) => {
    editor.update(() => {
      const nodeKey = node.getKey();
      const currentNode = $getNodeByKey(nodeKey) as CategoricalMaterialNode;
      if (currentNode) {
        currentNode.setSelected(selected);
      }
    });
    if (onMaterialChange) {
      onMaterialChange(selected);
    }
  };

  return (
    <CategoricalMaterial
      material={node.__material}
      color={node.__color}
      options={node.__options}
      selected={node.__selected}
      showMaterial={showMaterial}
      onMaterialChange={handleMaterialChange}
      fontSize={node.__fontSize}
    />
  );
}

export function CategoricalMaterialNodePreview(
  props: CategoricalMaterialNodeProps
) {
  return <CategoricalMaterial {...props} />;
}

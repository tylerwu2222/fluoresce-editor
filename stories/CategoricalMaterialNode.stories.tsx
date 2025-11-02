import React from "react";
import { CategoricalMaterialNodePreview } from "../src/components/nodes/MaterialNodes/CategoricalMaterialNode/CategoricalMaterialNode";

export default {
  title: "MaterialNodes/CategoricalMaterialNode",
  component: CategoricalMaterialNodePreview,
  tags: ["autodocs"],
};

const Template = (args: any) => <CategoricalMaterialNodePreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  material: "Solvent",
  color: "#f3e5f5",
  options: ["Water", "Ethanol", "Acetone"],
  selected: "Water",
};

export const Custom = Template.bind({});
Custom.args = {
  material: "Buffer",
  color: "#c8e6c9",
  options: ["PBS", "Tris", "HEPES"],
  selected: "Tris",
}; 
import React from "react";
import { CategoricalMaterialPreview } from "../src/components/nodes/MaterialNodes/MaterialNodeCategorical/MaterialNodeCategorical";

export default {
  title: "MaterialNodes/CategoricalMaterialNode",
  component: CategoricalMaterialPreview,
};

const Template = (args: any) => <CategoricalMaterialPreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  material: "Solvent",
  color: "#f3e5f5",
  categories: ["Water", "Ethanol", "Acetone"],
  selected: "Water",
};

export const Custom = Template.bind({});
Custom.args = {
  material: "Buffer",
  color: "#c8e6c9",
  categories: ["PBS", "Tris", "HEPES"],
  selected: "Tris",
}; 
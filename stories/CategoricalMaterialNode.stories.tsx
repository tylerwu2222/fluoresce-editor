import React from "react";
import { CategoricalMaterialNodePreview } from "../src/components/nodes/MaterialNodes/CategoricalMaterialNode/CategoricalMaterialNode";

export default {
  title: "MaterialNodes/CategoricalMaterialNode",
  component: CategoricalMaterialNodePreview,
};

const Template = (args: any) => <CategoricalMaterialNodePreview {...args} />;

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
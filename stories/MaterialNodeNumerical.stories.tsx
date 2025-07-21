import React from "react";
import { NumericalMaterialPreview } from "../src/components/nodes/MaterialNodes/MaterialNodeNumerical/MaterialNodeNumerical";

export default {
  title: "MaterialNodes/NumericalMaterialNode",
  component: NumericalMaterialPreview,
};

const Template = (args: any) => <NumericalMaterialPreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  material: "Water",
  color: "#e0f7fa",
  min: 0,
  max: 100,
  value: 42,
};

export const Custom = Template.bind({});
Custom.args = {
  material: "Ethanol",
  color: "#ffe0b2",
  min: -10,
  max: 50,
  value: 10,
}; 
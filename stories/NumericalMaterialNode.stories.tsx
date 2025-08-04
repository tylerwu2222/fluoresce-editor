import React from "react";
import { NumericalMaterialNodePreview } from "../src/components/nodes/MaterialNodes/NumericalMaterialNode/NumericalMaterialNode";

export default {
  title: "MaterialNodes/NumericalMaterialNode",
  component: NumericalMaterialNodePreview,
};

const Template = (args: any) => <NumericalMaterialNodePreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  material: "Water",
  color: "#e0f7fa",
  min: 0,
  max: 100,
  value: 42,
  unit: "g/L",
};

export const Custom = Template.bind({});
Custom.args = {
  material: "Ethanol",
  color: "#ffe0b2",
  min: -10,
  max: 50,
  value: 10,
  unit: "g/L",
};

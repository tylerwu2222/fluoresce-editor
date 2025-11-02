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
  value: 42,
  unit: "g/L",
  unitOptions: ["g/L", "mg/L", "mol/L", "ppm", "%"],
  materialOptions: ["Water", "Ethanol", "Methanol", "Acetone", "Toluene"],
};

export const Custom = Template.bind({});
Custom.args = {
  material: "Ethanol",
  color: "#ffe0b2",
  value: 10,
  unit: "g/L",
  unitOptions: ["g/L", "mg/L", "mol/L", "M", "mM", "µM"],
  materialOptions: ["Water", "Ethanol", "Methanol", "Acetone", "Toluene", "DMSO"],
};

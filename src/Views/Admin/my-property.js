import React from "react";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertyBeds } from "./property-beds";

export function MyProperty() {
  return (
    <div>
      <AdminPropertyStandards></AdminPropertyStandards>
      <AdminPropertyBeds></AdminPropertyBeds>
    </div>
  );
}

import React from "react";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";

export function MyProperty() {
  return (
    <div>
      <AdminPropertyStandards></AdminPropertyStandards>

      <AdminPropertyRoomtypes></AdminPropertyRoomtypes>
      <AdminPropertyBeds></AdminPropertyBeds>
    </div>
  );
}

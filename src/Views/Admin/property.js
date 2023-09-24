import React from "react";
import { AdminPropertyStandards } from "../../Components/Admin/property-standards";
import { AdminPropertyRoomtypes } from "../../Components/Admin/property-roomtypes";
import { AdminPropertySuites } from "../../Components/Admin/property-suites";

export function Property() {
  return (
    <div className="PropertyContentNames">
      <AdminPropertyStandards></AdminPropertyStandards>
      <AdminPropertyRoomtypes></AdminPropertyRoomtypes>
      <AdminPropertySuites></AdminPropertySuites>
    </div>
  );
}

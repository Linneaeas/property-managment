import React from "react";
import { AdminPropertyStandards } from "../../Components/Admin/property-standards";
import { AdminPropertyRoomtypes } from "../../Components/Admin/property-roomtypes";
import { AdminPropertySuites } from "../../Components/Admin/property-suites";
import { AdminPropertyBeds } from "../../Components/Admin/property-beds";
import { AdminPropertyFacilities } from "../../Components/Admin/property-facilities";
import { AdminPropertyProperties } from "../../Components/Admin/property-properties";

export function AdminPropertyContent() {
  return (
    <div className="PropertyContentNames">
      <AdminPropertySuites></AdminPropertySuites>
      <AdminPropertyStandards></AdminPropertyStandards>
      <AdminPropertyRoomtypes></AdminPropertyRoomtypes>
      <AdminPropertyBeds></AdminPropertyBeds>
      <AdminPropertyProperties></AdminPropertyProperties>
      <AdminPropertyFacilities></AdminPropertyFacilities>
    </div>
  );
}

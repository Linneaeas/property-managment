import React from "react";
import { AdminPropertyBeds } from "../../Components/Admin/property-beds";
import { AdminPropertyProperties } from "../../Components/Admin/property-properties";
import { AdminPropertyFacilities } from "../../Components/Admin/property-facilities";

export function Content() {
  return (
    <div className="PropertyContentNames">
      <AdminPropertyBeds></AdminPropertyBeds>
      <AdminPropertyProperties></AdminPropertyProperties>
      <AdminPropertyFacilities></AdminPropertyFacilities>
    </div>
  );
}

import React from "react";
import { BedsInRoomtypes } from "../../Components/Admin/property-beds-in-roomtypes.js";
import { RoomtypesInStandards } from "../../Components/Admin/property-roomtypes-in-standards.js";
import { FacilitiesInStandards } from "../../Components/Admin/property-facilities-in-standards.js";
import { SuitesStandardsProperties } from "../../Components/Admin/property-suites-standards-properties.js";

export function AdminPropertySettings() {
  return (
    <div className="AdminPropertyContentSettings">
      <SuitesStandardsProperties></SuitesStandardsProperties>
      <FacilitiesInStandards></FacilitiesInStandards>
      <RoomtypesInStandards></RoomtypesInStandards>
      <BedsInRoomtypes></BedsInRoomtypes>
    </div>
  );
}

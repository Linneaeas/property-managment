import React from "react";
import { BedsInRoomtypes } from "../../Components/Admin/property-beds-in-roomtypes.js";
import { RoomtypesInStandards } from "../../Components/Admin/property-roomtypes-in-standards.js";
import { SuitesStandards } from "../../Components/Admin/property-suites-standards.js";
import { FacilitiesInStandards } from "../../Components/Admin/property-facilities-in-standards.js";
import { PropertiesInSuites } from "../../Components/Admin/property-properties-in-suites.js";

export function Settings() {
  return (
    <div className="PropertyContentSettings">
      <SuitesStandards></SuitesStandards>
      <RoomtypesInStandards></RoomtypesInStandards>
      <BedsInRoomtypes></BedsInRoomtypes>
      <FacilitiesInStandards></FacilitiesInStandards>
      <PropertiesInSuites></PropertiesInSuites>
    </div>
  );
}

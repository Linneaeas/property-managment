import React from "react";
import { BedsInRoomtypes } from "../../Components/Admin/property-beds-in-roomtypes.js";
import { RoomtypesInStandards } from "../../Components/Admin/property-roomtypes-in-standards.js";
import { SuitesStandards } from "../../Components/Admin/property-suites-standards.js";

export function Settings() {
  return (
    <div className="PropertyContentSettings">
      <BedsInRoomtypes></BedsInRoomtypes>
      <RoomtypesInStandards></RoomtypesInStandards>
      <SuitesStandards></SuitesStandards>
    </div>
  );
}

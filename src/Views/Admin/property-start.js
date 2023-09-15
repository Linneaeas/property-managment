import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "react-router-dom";
import { AdminStart } from "./admin-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertyStart() {
  return (
    <aside className="PropertyNav">
      <div className="LinkContainer">
        <Link to="./Standards">Standards</Link>
        <Link to="./Suites">Suites</Link>
        <Link to="./Beds">Beds</Link>
        <Link to="./Roomtypes">Roomtypes</Link>
        <Link to="./Properties">Properties</Link>
        <Link to="./Facilities">Facilities</Link>
      </div>
    </aside>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { AdminStart } from "./admin-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertyStart() {
  return (
    <div className="PropertyNav">
      <div className="LinkContainer">
        <h3>PROPERTY</h3>
        <Link to="/Property/Standards">Standards</Link>
        <Link to="/Property/Suites">Suites</Link>
        <Link to="/Property/Beds">Beds</Link>
        <Link to="/Property/Roomtypes">Roomtypes</Link>
        <Link to="/Property/Properties">Properties</Link>
        <Link to="/Property/Facilities">Facilities</Link>
      </div>
    </div>
  );
}

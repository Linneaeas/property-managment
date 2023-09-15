import { AdminPropertyStart } from "./property-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertySuites() {
  return (
    <div className="PropertyContainer">
      <AdminPropertyStart />
      <div className="PropertyContent">
        <h2>Suites</h2>
      </div>
    </div>
  );
}

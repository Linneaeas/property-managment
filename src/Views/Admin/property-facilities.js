import { AdminPropertyStart } from "./property-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";

export function AdminPropertyFacilities() {
  return (
    <div className="PropertyContainer">
      <AdminPropertyStart />
      <div className="PropertyContent">
        <h2>Facilities</h2>
      </div>
    </div>
  );
}

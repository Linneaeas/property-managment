import { AdminPropertyStart } from "./property-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertyRoomtypes() {
  return (
    <div className="PropertyContainer">
      <AdminPropertyStart />
      <div className="PropertyContent">
        <h2>Roomtypes</h2>
      </div>
    </div>
  );
}

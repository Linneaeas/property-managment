import { AdminPropertyStart } from "./property-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertyBeds() {
  return (
    <div className="PropertyContainer">
      <AdminPropertyStart />
      <div className="PropertyContent">
        <h2>Beds</h2>
      </div>
    </div>
  );
}

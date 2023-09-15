import { AdminPropertyStart } from "./property-start";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminPropertyStandards() {
  return (
    <div className="PropertyContainer">
      <AdminPropertyStart />
      <div className="PropertyContent">
        <h2>Standards</h2>
      </div>
    </div>
  );
}

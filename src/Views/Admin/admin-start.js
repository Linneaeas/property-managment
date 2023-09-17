import LogoutButton from "../../Components/logout-button";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminStart({ Logout }) {
  return (
    <div className="AdminHeader">
      {Logout && <LogoutButton Logout={Logout} />}
      <div className="AdminNav">
        <div className="Dropdown">
          <button className="Link"> PROPERTY </button>
          <div className="DropdownMenu"> Dropdown content</div>
        </div>
        <div className="Dropdown">
          <button className="Link"> REVENUE </button>
        </div>
        <div className="Dropdown">
          <button className="Link"> FINANCIAL </button>
        </div>
        <div className="Dropdown">
          <button className="Link"> ADVANCED </button>
        </div>
        <div className="Dropdown">
          <button className="Link"> MISCELLANIOUS </button>
        </div>
      </div>
      <Routes>
        <Route path="Property/Overwiev" element={<AdminPropertyOverview />} />
        <Route path="Property/Standards" element={<AdminPropertyStandards />} />
        <Route path="Property/Suites" element={<AdminPropertySuites />} />
        <Route path="Property/Beds" element={<AdminPropertyBeds />} />
        <Route path="Property/Roomtypes" element={<AdminPropertyRoomtypes />} />
        <Route
          path="Property/Properties"
          element={<AdminPropertyProperties />}
        />
        <Route
          path="Property/Facilities"
          element={<AdminPropertyFacilities />}
        />
      </Routes>
    </div>
  );
}

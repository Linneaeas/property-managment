import LogoutButton from "../../Components/logout-button";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyStart } from "./property-start";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";

export function AdminStart({ Logout }) {
  return (
    <div>
      {Logout && <LogoutButton Logout={Logout} />}
      <div className="Header">
        <h1>ADMIN</h1>
      </div>
      <div>
        <div className="AdminHeader">
          <nav className="AdminNav">
            <Link to="./Property">PROPERTY</Link>
            <p> REVENUE </p>
            <p> FINANCIAL </p>
            <p> ADVANCED </p>
            <p> MISCELLANIOUS </p>
          </nav>
        </div>

        <Routes>
          <Route path="Property" element={<AdminPropertyStart />} />
          <Route
            path="Property/Standards"
            element={<AdminPropertyStandards />}
          />
          <Route path="Property/Suites" element={<AdminPropertySuites />} />
          <Route path="Property/Beds" element={<AdminPropertyBeds />} />
          <Route
            path="Property/Roomtypes"
            element={<AdminPropertyRoomtypes />}
          />
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
    </div>
  );
}

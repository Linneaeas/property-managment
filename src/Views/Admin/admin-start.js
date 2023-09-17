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
          <div className="DropdownMenu">
            <div className="DDOverview">
              <Link to="/Overview">Overview</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Standards">Standards</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Suites">Suites</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Beds">Beds</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Roomtypes">Roomtypes</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Properties">Properties</Link>
            </div>
            <div className="DDLinks">
              <Link to="/Facilities">Facilities</Link>
            </div>{" "}
          </div>
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
        <Route path="/Overview" element={<AdminPropertyOverview />} />
        <Route path="/Standards" element={<AdminPropertyStandards />} />
        <Route path="/Suites" element={<AdminPropertySuites />} />
        <Route path="/Beds" element={<AdminPropertyBeds />} />
        <Route path="/Roomtypes" element={<AdminPropertyRoomtypes />} />
        <Route path="/Properties" element={<AdminPropertyProperties />} />
        <Route path="/Facilities" element={<AdminPropertyFacilities />} />
      </Routes>
    </div>
  );
}

import LogoutButton from "../../Components/buttons";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import { StandardsRoomtypesSuites } from "./standards-roomtypes-suites";
import { BedsPropertiesFacilities } from "./beds-properties-facilities";
import { Settings } from "./property-settings";
import React, { useState, useRef } from "react";
import OutsideClickListener from "../../Components/event-listeners";

export function AdminStart({ Logout }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  const handleOutsideClick = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="AdminView">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <nav className="AdminNavContainer">
          <div className="LogoutBTNDiv">
            {Logout && <LogoutButton Logout={Logout} />}
          </div>
          <div className="AdminNavMainContent">
            <div className="Dropdown" ref={dropdownRef}>
              <button className="NavLink" onClick={toggleDropdown}>
                PROPERTY
              </button>
              <div
                className={`DropdownMenu ${dropdownVisible ? "visible" : ""}`}
              >
                <div className="DDLinks">
                  <Link
                    className="TopDDLink"
                    to="/Overview"
                    onClick={handleLinkClick}
                  >
                    Overview
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Standards.Roomtypes.Suites"
                    onClick={handleLinkClick}
                  >
                    Standards Roomtypes Suites
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Beds.Properties.Facilities"
                    onClick={handleLinkClick}
                  >
                    Beds Properties Facilities
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Settings"
                    onClick={handleLinkClick}
                  >
                    Settings
                  </Link>
                </div>
                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Settings"
                    onClick={handleLinkClick}
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </div>
            <div className="Dropdown">
              <button className="NavLink"> REVENUE </button>
            </div>
            <div className="Dropdown">
              <button className="NavLink"> FINANCIAL </button>
            </div>
            <div className="Dropdown">
              <button className="NavLink"> ADVANCED </button>
            </div>
            <div className="Dropdown">
              <button className="NavLink"> MISCELLANIOUS </button>
            </div>
          </div>
        </nav>
      </OutsideClickListener>
      <Routes>
        <Route path="/Overview" element={<AdminPropertyOverview />} />
        <Route
          path="/Standards.Roomtypes.Suites"
          element={<StandardsRoomtypesSuites />}
        />
        <Route
          path="/Beds.Properties.Facilities"
          element={<BedsPropertiesFacilities />}
        />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

import LogoutButton from "../../Components/buttons";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";
import { MyProperty } from "./my-property";
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
                    className="DDLink"
                    to="/Overview"
                    onClick={handleLinkClick}
                  >
                    Overview
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/MyProperty"
                    onClick={handleLinkClick}
                  >
                    My Property
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Standards"
                    onClick={handleLinkClick}
                  >
                    {" "}
                    Standards
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Suites"
                    onClick={handleLinkClick}
                  >
                    Suites
                  </Link>
                </div>
                <div className="DDLinks">
                  <Link className="DDLink" to="/Beds" onClick={handleLinkClick}>
                    Beds
                  </Link>
                </div>
                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Roomtypes"
                    onClick={handleLinkClick}
                  >
                    Roomtypes
                  </Link>
                </div>
                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Properties"
                    onClick={handleLinkClick}
                  >
                    Properties
                  </Link>
                </div>
                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Facilities"
                    onClick={handleLinkClick}
                  >
                    Facilities
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
        <Route path="/MyProperty" element={<MyProperty />} />
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

import LogoutButton from "../../Components/buttons";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import { AdminPropertyStandards } from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";
import React, { useState, useRef } from "react";
import OutsideClickListener from "../../Components/event-listeners";

export function AdminStart({ Logout }) {
  const [dropdownVisible, setDropdownVisible] = useState(false); //State to manage the visibility of the dropdown menu
  const dropdownRef = useRef(null); // Reference to the dropdown menu element-useRef is a hook that provides a way to create mutable object properties that persist across renders. It allows you to create a reference to a DOM element or any other value and ensures that the reference remains consistent across renders.

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the visibility of the dropdown menu, ! makes it turn the opposite of the current value
  };

  const handleLinkClick = () => {
    setDropdownVisible(false); // Handle link click to close the dropdown menu- set the value to be false no matter original value.
  };

  const handleOutsideClick = () => {
    setDropdownVisible(false); // Handle outside click to close the dropdown menu
  };

  return (
    <div className="AdminView">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        {" "}
        {/*Call OutsideClickListener to handle outside clicks */}
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
                {/*dropdownVisible is the condition.
             "visible" is the value if dropdownVisible is true.
            "" is the value if dropdownVisible is false (an empty string).
             So, if dropdownVisible is true, it adds the class "visible" to the DropdownMenu component; otherwise, it doesn't add any class (empty string).*/}
                <div className="DDOverview">
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
                    to="/Standards"
                    onClick={handleLinkClick}
                  >
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

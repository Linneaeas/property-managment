import LogoutButton from "../../Components/logout-button";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import AdminPropertyStandards from "./property-standards";
import { AdminPropertySuites } from "./property-suites";
import { AdminPropertyBeds } from "./property-beds";
import { AdminPropertyRoomtypes } from "./property-roomtypes";
import { AdminPropertyProperties } from "./property-properties";
import { AdminPropertyFacilities } from "./property-facilities";
import React, { useState, useRef, useEffect } from "react";

export function AdminStart({ Logout }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="AdminHeader">
      {Logout && <LogoutButton Logout={Logout} />}
      <div className="AdminNav">
        <div className="Dropdown" ref={dropdownRef}>
          <button className="Link" onClick={toggleDropdown}>
            PROPERTY
          </button>
          <div className={`DropdownMenu ${dropdownVisible ? "visible" : ""}`}>
            <div className="DDOverview">
              <Link to="/Overview" onClick={handleLinkClick}>
                Overview
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Standards" onClick={handleLinkClick}>
                Standards
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Suites" onClick={handleLinkClick}>
                Suites
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Beds" onClick={handleLinkClick}>
                Beds
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Roomtypes" onClick={handleLinkClick}>
                Roomtypes
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Properties" onClick={handleLinkClick}>
                Properties
              </Link>
            </div>
            <div className="DDLinks">
              <Link to="/Facilities" onClick={handleLinkClick}>
                Facilities
              </Link>
            </div>
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

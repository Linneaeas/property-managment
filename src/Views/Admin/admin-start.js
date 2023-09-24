import LogoutButton from "../../Components/buttons";
import { Routes, Route, Link } from "react-router-dom";
import { AdminPropertyOverview } from "./property-overview";
import { Property } from "./property";
import { Content } from "./content";
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
                    to="/Property"
                    onClick={handleLinkClick}
                  >
                    Property
                  </Link>
                </div>

                <div className="DDLinks">
                  <Link
                    className="DDLink"
                    to="/Content"
                    onClick={handleLinkClick}
                  >
                    Content
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
        <Route path="/Property" element={<Property />} />
        <Route path="/Content" element={<Content />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

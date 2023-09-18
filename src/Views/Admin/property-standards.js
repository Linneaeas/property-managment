import React from "react";

export function AdminPropertyStandards() {
  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY STANDARDS</h1>
        <table className="PropertyTable">
          <tr id="TRTableHeadline">
            <th id="THTableHeadline">EDIT:</th>
            <th id="THTableHeadline">NAME:</th>
          </tr>
          <tr id="TRTableContent">
            <th id="THTableEdit">BTN</th>
            <th id="THTableName">Icon</th>
          </tr>
          <tr id="TRTableContent">
            <th id="THTableEdit">BTN</th>
            <th id="THTableName">Legend</th>
          </tr>
          <tr id="TRTableContent">
            <th id="THTableEdit">BTN</th>
            <th id="THTableName">Star</th>
          </tr>
          <tr id="TRTableContent">
            <th id="THTableEdit">BTN</th>
            <th id="THTableName">Statement</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AdminStart } from "./admin-start";
import { getStandardsFromLocalStorage } from "../../Components/local-storage";

export function AdminPropertyOverview() {
  const [standards, setStandards] = useState([]);

  useEffect(() => {
    // Load standards from local storage when the component mounts
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>Property Overview</h1>
        <h2>Property standards:</h2>
        <ul>
          {standards.map((standard) => (
            <li key={standard.id}>{standard.standardName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

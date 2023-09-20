import React, { useEffect, useState } from "react";
import { AdminStart } from "./admin-start";
import { getStandardsFromLocalStorage } from "../../Components/local-storage";
import { getSuitesFromLocalStorage } from "../../Components/local-storage";

export function AdminPropertyOverview() {
  const [standards, setStandards] = useState([]);
  const [suites, setSuites] = useState([]);

  useEffect(() => {
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
    }
  }, []);

  useEffect(() => {
    const savedSuites = getSuitesFromLocalStorage();
    if (savedSuites) {
      setSuites(savedSuites);
    }
  }, []);

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>Property Overview</h1>
        <table className="PropertyTable">
          <thead>
            <tr>
              <th className="ColHeadline">Name:</th>
              <th className="ColHeadline">Standard:</th>
            </tr>
          </thead>
          {suites.map((suite) => (
            <tr key={suite.id}>
              <td>{suite.suiteName}</td>
              <td>{suite.selectedStandard}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

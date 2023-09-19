import React, { useEffect, useState } from "react";
import {
  getStandardsFromLocalStorage,
  saveSuitesToLocalStorage,
  getSuitesFromLocalStorage,
} from "../../Components/local-storage";

export function AdminPropertySuites() {
  const [standards, setStandards] = useState([]);
  useEffect(() => {
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
    }
  }, []);
  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>SUITES</h1>
      </div>
    </div>
  );
}

/*<input list="standardOptions" /><datalist id="standardOptions">
{standards.map((standard) => (
  <option key={standard.id} value={standard.standardName} />
))}
</datalist> */

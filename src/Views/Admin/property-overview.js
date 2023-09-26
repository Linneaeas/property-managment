import React, { useEffect, useState } from "react";
import { getStandardsFromLocalStorage } from "../../Components/local-storage";
import { getSuitesFromLocalStorage } from "../../Components/local-storage";
import { getPropertiesFromLocalStorage } from "../../Components/local-storage";
import { getRoomtypesFromLocalStorage } from "../../Components/local-storage";

export function AdminPropertyOverview() {
  const [standards, setStandards] = useState([]);
  const [suites, setSuites] = useState([]);
  const [properties, setProperties] = useState([]);
  const [roomtypes, setRoomtypes] = useState([]);

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

  useEffect(() => {
    const savedProperties = getPropertiesFromLocalStorage();
    if (savedProperties) {
      setProperties(savedProperties);
    }
  }, []);

  useEffect(() => {
    const savedRoomtypes = getRoomtypesFromLocalStorage();
    if (savedRoomtypes) {
      setRoomtypes(savedRoomtypes);
    }
  }, []);

  const propertieHeaders = properties.map((propertie) => (
    <th className="ColHeadline" key={propertie.id}>
      {propertie.propertieName}
    </th>
  ));

  const getSuitesFromLocalStorage = () => {
    const suites = JSON.parse(localStorage.getItem("suites"));
    const standards = getStandardsFromLocalStorage() || [];

    if (suites && suites.length > 0 && standards && standards.length > 0) {
      return suites.map((suite) => {
        const standard = standards.find(
          (s) => s.standardName === suite.selectedStandard
        );
        if (standard) {
          const roomtypeOptions = standard.roomtypeOptions || {};
          return {
            ...suite,
            selectedRoomtypes: roomtypeOptions,
          };
        }
        return suite;
      });
    }
    return suites;
  };

  const roomtypeHeaders = roomtypes.map((roomtype) => (
    <th className="ColHeadline" key={roomtype.id}>
      {roomtype.roomtypeName}
    </th>
  ));

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY OVERVIEW</h1>
        <table className="PropertyTable">
          <thead>
            <tr>
              <th className="ColHeadline">Name:</th>
              <th className="ColHeadline">Standard:</th>
              {propertieHeaders}
              {roomtypeHeaders}
            </tr>
          </thead>
          <tbody>
            {suites.map((suite) => (
              <tr key={suite.id}>
                <td>{suite.suiteName}</td>
                <td>{suite.selectedStandard}</td>
                {properties.map((propertie) => (
                  <td key={propertie.id} className="SuitePropertieBox">
                    {suite &&
                    propertie &&
                    suite.propertieOptions &&
                    suite.propertieOptions[propertie.id] ? (
                      <div className="OptionChoice">
                        <span className="OptionChoice">
                          {suite.propertieOptions[propertie.id]}
                        </span>
                      </div>
                    ) : (
                      <div className="NoSelection">{"-"}</div>
                    )}
                  </td>
                ))}
                {roomtypes.map((roomtype) => (
                  <td key={roomtype.id} className="SuiteStandardRoomtypeBox">
                    {suite &&
                    suite.selectedRoomtypes &&
                    suite.selectedRoomtypes[roomtype.id] ? (
                      <div className="OptionChoice">
                        <span className="OptionChoice">
                          {suite.selectedRoomtypes[roomtype.id]}
                        </span>
                      </div>
                    ) : (
                      <div className="NoSelection">{"-"}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

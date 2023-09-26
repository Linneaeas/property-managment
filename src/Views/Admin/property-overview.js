import React, { useEffect, useState } from "react";
import { getStandardsFromLocalStorage } from "../../Components/local-storage";
import { getSuitesFromLocalStorage } from "../../Components/local-storage";
import { getPropertiesFromLocalStorage } from "../../Components/local-storage";
import { getRoomtypesFromLocalStorage } from "../../Components/local-storage";
import { getFacilitiesFromLocalStorage } from "../../Components/local-storage";
import { getBedsFromLocalStorage } from "../../Components/local-storage";

export function AdminPropertyOverview() {
  const [standards, setStandards] = useState([]);
  const [suites, setSuites] = useState([]);
  const [properties, setProperties] = useState([]);
  const [roomtypes, setRoomtypes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [beds, setBeds] = useState([]);

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

  useEffect(() => {
    const savedFacilities = getFacilitiesFromLocalStorage();
    if (savedFacilities) {
      setFacilities(savedFacilities);
    }
  }, []);

  useEffect(() => {
    const savedBeds = getBedsFromLocalStorage();
    if (savedBeds) {
      setBeds(savedBeds);
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
    const facilities = getFacilitiesFromLocalStorage() || [];
    const suiteCapacities = calculateSuiteCapacity(standards, roomtypes, beds);

    if (suites && suites.length > 0 && standards && standards.length > 0) {
      return suites.map((suite) => {
        const standard = standards.find(
          (s) => s.standardName === suite.selectedStandard
        );

        if (standard) {
          const roomtypeOptions = standard.roomtypeOptions || {};
          const facilityOptions = standard.facilityOptions || {};
          return {
            ...suite,
            selectedRoomtypes: roomtypeOptions,
            selectedFacilities: facilityOptions,
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

  const calculateTotalRoomsInSuite = (suite) => {
    let totalRooms = 0;
    for (const roomtype of roomtypes) {
      const roomCount = suite.selectedRoomtypes[roomtype.id] || 0;
      totalRooms += parseInt(roomCount, 10);
    }
    return totalRooms;
  };

  function calculateRoomtypeCapacity(roomtype, beds) {
    return Object.keys(roomtype.bedOptions).reduce((totalCapacity, bedId) => {
      const bed = beds.find((bed) => bed.id === bedId);
      if (bed) {
        const bedCapacity = bed.selectedBedPersons || 0;
        const bedCount = roomtype.bedOptions[bedId] || 0;
        return totalCapacity + bedCapacity * bedCount;
      }
      return totalCapacity;
    }, 0);
  }

  function calculateSuiteCapacity(standards, roomtypes, beds) {
    return standards.map((standard) => {
      const capacity = roomtypes
        .filter((roomtype) => roomtype.standardId === standard.id)
        .reduce((totalCapacity, roomtype) => {
          return totalCapacity + calculateRoomtypeCapacity(roomtype, beds);
        }, 0);

      return { ...standard, capacity };
    });
  }

  function calculateTotalPersonsInSuite(suite, roomtypes, beds) {
    return roomtypes.reduce((totalPersons, roomtype) => {
      const roomCount = suite.selectedRoomtypes[roomtype.id] || 0;
      const roomtypeCapacity = calculateRoomtypeCapacity(roomtype, beds);
      return totalPersons + roomCount * roomtypeCapacity;
    }, 0);
  }

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY OVERVIEW</h1>
        <table className="PropertyTable" id="Overview">
          <thead>
            <tr>
              <th className="ColHeadline">Name:</th>
              <th className="ColHeadline">Standard:</th>
              {propertieHeaders}
              {roomtypeHeaders}
              <th className="ColHeadlineBigger">Tot, Rms:</th>
              <th className="ColHeadlineBigger">Tot. Prs:</th>
              <th className="ColHeadline">Facilities:</th>
            </tr>
          </thead>
          <tbody>
            {suites.map((suite) => (
              <tr className="OverviewRow" key={suite.id}>
                <td>{suite.suiteName}</td>
                <td>{suite.selectedStandard}</td>
                {properties.map((propertie) => (
                  <td key={propertie.id}>
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
                  <td key={roomtype.id}>
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

                <td>
                  <div className="OptionChoice">
                    <span className="OptionChoiceTotal">
                      {calculateTotalRoomsInSuite(suite)}
                    </span>
                  </div>{" "}
                </td>
                <td>
                  <div className="OptionChoice">
                    <span className="OptionChoiceTotal">
                      {calculateTotalPersonsInSuite(suite, roomtypes, beds)}
                    </span>
                  </div>{" "}
                </td>

                <td id="SuiteStandardFacilityBox">
                  <div className="OptionChoiceFacilities">
                    {facilities
                      .filter(
                        (facility) =>
                          suite.selectedFacilities &&
                          suite.selectedFacilities[facility.id]
                      )
                      .map((facility) => (
                        <span key={facility.id}>{facility.facilityName},</span>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

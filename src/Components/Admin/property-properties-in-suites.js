import React, { useEffect, useState } from "react";
import {
  getSuitesFromLocalStorage,
  saveSuitesToLocalStorage,
  getPropertiesFromLocalStorage,
} from "../local-storage";
import { EditButton, SaveButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

export function DataTable({ suites, setSuites, properties, onEdit, onSave }) {
  const propertieHeaders = properties.map((propertie) => (
    <th className="ColHeadline" key={propertie.id}>
      {propertie.propertieName}
    </th>
  ));

  const handlePropertieOptionChange = (suiteId, propertieId, value) => {
    const updatedSuites = suites.map((suite) =>
      suite.id === suiteId
        ? {
            ...suite,
            propertieOptions: {
              ...suite.propertieoptions,
              [propertieId]: parseInt(value, 10),
            },
          }
        : suite
    );
    setSuites(updatedSuites);
  };

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th></th>
          {propertieHeaders}
        </tr>
      </thead>
      <tbody>
        {suites.map((suite) => (
          <tr key={suite.id}>
            <td className="ColHeadline">{suite.suiteName}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(suite.id)} />
            </td>
            {properties.map((propertie) => (
              <td key={propertie.id} className="SuitePropertieBox">
                {suite.isEditing ? (
                  <div className="ManualInputSetting">
                    <input
                      type="text"
                      className="SmallInput"
                      value={
                        (suite.propertieOptions &&
                          suite.propertieOptions[propertie.id]) ||
                        ""
                      }
                      onChange={(e) =>
                        handlePropertieOptionChange(
                          suite.id,
                          propertie.id,
                          e.target.value
                        )
                      }
                    ></input>
                  </div>
                ) : (
                  (suite.propertieptions &&
                    suite.propertieOptions[propertie.id]) || (
                    <div className="OptionChoice">
                      <span className="NoSelection">{"-"}</span>
                    </div>
                  )
                )}
              </td>
            ))}
            <td className="SaveBTNBox">
              {suite.isEditing && (
                <>
                  <SaveButton onSave={() => onSave(suite.id)} />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PropertiesInSuites() {
  const [suites, setSuites] = useState(getSuitesFromLocalStorage() || []);
  const [properties, setProperties] = useState(
    getPropertiesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [isEditingSuite, setIsEditingSuite] = useState(false);
  const [suite, setSuite] = useState(false);

  useEffect(() => {
    const savedProperties = getPropertiesFromLocalStorage();
    if (savedProperties) {
      setProperties(savedProperties);
    }
  }, []);

  useEffect(() => {
    const savedSuites = getSuitesFromLocalStorage();
    if (savedSuites) {
      setSuites(savedSuites);
    }
  }, []);

  const handleEdit = (id) => {
    const updatedSuites = suites.map((suite) => {
      if (suite.id === id) {
        return {
          ...suite,
          isEditing: !suite.isEditing,
        };
      }
      return {
        ...suite,
        isEditing: false,
      };
    });

    setSuites(updatedSuites);
  };

  const handleSave = (id) => {
    const updatedSuites = suites.map((suite) => {
      if (suite.id === id) {
        return {
          ...suite,
          isEditing: false,
          selectedPropertieSetting: suite.selectedPropertieSetting,
        };
      }
      return suite;
    });
    setSuites(updatedSuites);
    saveSuitesToLocalStorage(updatedSuites);
  };

  const handleOutsideClick = () => {
    if (!isEditingSuite) {
      setShowInput(false);
    }

    if (isEditingSuite) {
      const updatedSuites = suites.map((suite) => ({
        ...suite,
        isEditing: false,
      }));
      setSuites(updatedSuites);
      setIsEditingSuite(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>PROPERTIES IN SUITES</h1>
          <DataTable
            suites={suites}
            setSuites={setSuites}
            properties={properties}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditingSuite={isEditingSuite}
            handleOutsideClick={handleOutsideClick}
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}

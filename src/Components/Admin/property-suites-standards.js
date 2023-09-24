import React, { useEffect, useState } from "react";
import {
  saveSuitesToLocalStorage,
  getSuitesFromLocalStorage,
  getStandardsFromLocalStorage,
} from "../local-storage";
import { EditButton, SaveButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

export function DataTable({ suites, setSuites, standards, onEdit, onSave }) {
  const handleStandardOptionChange = (suiteId, value) => {
    const updatedSuites = suites.map((suite) =>
      suite.id === suiteId
        ? {
            ...suite,
            selectedStandard: value,
          }
        : suite
    );
    setSuites(updatedSuites);
  };

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th className="ColHeadline"></th>
          <th></th>
          <th className="ColHeadline"></th>
        </tr>
      </thead>
      <tbody>
        {suites.map((suite) => (
          <tr key={suite.id}>
            <td className="ColHeadline">{suite.suiteName}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(suite.id)} />
            </td>
            <td className="SuitesStandardBox">
              {suite.isEditing ? (
                <div className="InputWithDatalist">
                  <select
                    value={suite.selectedStandard}
                    onChange={(e) => {
                      handleStandardOptionChange(suite.id, e.target.value);
                    }}
                  >
                    <option value="">Select a standard</option>
                    {standards.map((standard) => (
                      <option key={standard.id} value={standard.standardName}>
                        {standard.standardName}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                suite.selectedStandard || (
                  <span className="NoSelection">{"-"}</span>
                )
              )}
            </td>
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

export function SuitesStandards() {
  const [suites, setSuites] = useState(getSuitesFromLocalStorage() || []);
  const [showInput, setShowInput] = useState(false);

  const [isEditingSuite, setIsEditingSuite] = useState(false);
  const [standards, setStandards] = useState([]);

  useEffect(() => {
    const savedSuites = getSuitesFromLocalStorage();
    if (savedSuites) {
      setSuites(savedSuites);
    }
  }, []);

  useEffect(() => {
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
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
          selectedStandard: suite.selectedStandard,
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
          <h1>SUITES STANDARDS</h1>
          <DataTable
            suites={suites}
            standards={standards}
            onEdit={handleEdit}
            onSave={handleSave}
            setSuites={setSuites}
            isEditingSuite={isEditingSuite}
            handleOutsideClick={handleOutsideClick}
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  getStandardsFromLocalStorage,
  saveStandardsToLocalStorage,
  getFacilitiesFromLocalStorage,
} from "../local-storage";
import { EditButton, SaveButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

export function DataTable({
  standards,
  setStandards,
  facilities,
  onEdit,
  onSave,
}) {
  const facilityHeaders = facilities.map((facility) => (
    <th className="ColHeadline" key={facility.id}>
      {facility.facilityName}
    </th>
  ));

  const handleFacilityOptionChange = (standardId, facilityId, value) => {
    const updatedStandards = standards.map((standard) =>
      standard.id === standardId
        ? {
            ...standard,
            facilityOptions: {
              ...standard.facilityoptions,
              [facilityId]: parseInt(value, 10),
            },
          }
        : standard
    );
    setStandards(updatedStandards);
  };

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th></th>
          {facilityHeaders}
        </tr>
      </thead>
      <tbody>
        {standards.map((standard) => (
          <tr key={standard.id}>
            <td className="ColHeadline">{standard.standardName}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(standard.id)} />
            </td>
            {facilities.map((facility) => (
              <td key={facility.id} className="StandardFacilityBox">
                {standard.isEditing ? (
                  <div className="ManualInputSetting">
                    <input
                      type="checkbox"
                      className="Checkbox"
                      value={
                        (standard.facilityOptions &&
                          standard.facilityOptions[facility.id]) ||
                        ""
                      }
                      onChange={(e) =>
                        handleFacilityOptionChange(
                          standard.id,
                          facility.id,
                          e.target.value
                        )
                      }
                    ></input>
                  </div>
                ) : (
                  (standard.facilityOptions &&
                    standard.facilityOptions[facility.id]) || (
                    <span className="NoSelection">{"-"}</span>
                  )
                )}
              </td>
            ))}
            <td className="SaveBTNBox">
              {standard.isEditing && (
                <>
                  <SaveButton onSave={() => onSave(standard.id)} />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FacilitiesInStandards() {
  const [standards, setStandards] = useState(
    getStandardsFromLocalStorage() || []
  );
  const [facilities, setFacilities] = useState(
    getFacilitiesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [isEditingStandard, setIsEditingStandard] = useState(false);
  const [standard, setStandard] = useState(false);

  useEffect(() => {
    const savedFacilities = getFacilitiesFromLocalStorage();
    if (savedFacilities) {
      setFacilities(savedFacilities);
    }
  }, []);

  useEffect(() => {
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
    }
  }, []);

  const handleEdit = (id) => {
    const updatedStandards = standards.map((standard) => {
      if (standard.id === id) {
        return {
          ...standard,
          isEditing: !standard.isEditing,
        };
      }
      return {
        ...standard,
        isEditing: false,
      };
    });

    setStandards(updatedStandards);
  };

  const handleSave = (id) => {
    const updatedStandards = standards.map((standard) => {
      if (standard.id === id) {
        return {
          ...standard,
          isEditing: false,
          selectedFacilitySetting: standard.selectedFacilitySetting,
        };
      }
      return standard;
    });
    setStandards(updatedStandards);
    saveStandardsToLocalStorage(updatedStandards);
  };

  const handleOutsideClick = () => {
    if (!isEditingStandard) {
      setShowInput(false);
    }

    if (isEditingStandard) {
      const updatedStandards = standards.map((standard) => ({
        ...standard,
        isEditing: false,
      }));
      setStandards(updatedStandards);
      setIsEditingStandard(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>FACILITIES IN STANDARD</h1>
          <DataTable
            standards={standards}
            setStandards={setStandards}
            facilities={facilities}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditingStandard={isEditingStandard}
            handleOutsideClick={handleOutsideClick}
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}

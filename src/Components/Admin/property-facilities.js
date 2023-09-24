import React, { useState } from "react";
import {
  getFacilitiesFromLocalStorage,
  saveFacilitiesToLocalStorage,
} from "../local-storage";
import { AddButton, EditButton, SaveButton, DeleteButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

function DataTableRow({
  facility,
  onEdit,
  onDelete,
  onSave,
  setFacilities,
  facilities,
}) {
  const handleInputChange = (e) => {
    const updatedFacilities = facilities.map((fct) =>
      fct.id === facility.id ? { ...fct, editedName: e.target.value } : fct
    );
    setFacilities(updatedFacilities);
  };

  return (
    <tr key={facility.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(facility.id)} />
      </td>
      <td className="FacilityNameBox">
        {facility.isEditing ? (
          <input
            type="text"
            value={facility.editedName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          facility.facilityName
        )}
      </td>
      <td className="SaveOrDeleteBTNBox">
        {facility.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(facility.id)} />
            <SaveButton onSave={() => onSave(facility.id)} />
          </>
        )}
      </td>
    </tr>
  );
}

function DataTable({
  facilities,
  onEdit,
  onDelete,
  onSave,
  setFacilities,
  isAddingNewFacility,
}) {
  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th className="ColHeadline">Name:</th>
        </tr>
      </thead>
      <tbody>
        {facilities.map((item) => (
          <DataTableRow
            key={item.id}
            facility={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            setFacilities={setFacilities}
            isAddingNewFacility={isAddingNewFacility}
            facilities={facilities}
          />
        ))}
      </tbody>
    </table>
  );
}
export function AdminPropertyFacilities() {
  const [facilities, setFacilities] = useState(
    getFacilitiesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [newFacilityName, setNewFacilityName] = useState("");
  const [isAddingNewFacility, setIsAddingNewFacility] = useState(false);
  const [isEditingFacility, setIsEditingFacility] = useState(false);

  const handleAddButtonClick = () => {
    setNewFacilityName("");
    setShowInput(true);
    setIsAddingNewFacility(true);
  };

  const handleAddFacility = () => {
    if (newFacilityName.trim() !== "") {
      const isDuplicateName = facilities.some(
        (facility) => facility.facilityName === newFacilityName
      );

      if (isDuplicateName) {
        alert(
          "Facility with this name already exists. Please choose a new name."
        );
        return;
      }

      const newFacility = {
        id: newFacilityName,
        facilityName: newFacilityName,
        isEditing: false,
        editedName: "",
      };
      const updatedFacilities = [...facilities, newFacility];
      setFacilities(updatedFacilities);
      saveFacilitiesToLocalStorage(updatedFacilities);
      setNewFacilityName("");
      setShowInput(false);
      setIsAddingNewFacility(false);
    }
  };

  const handleEdit = (id) => {
    const updatedFacilities = facilities.map((item) => {
      if (item.id === id) {
        setIsEditingFacility(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.facilityName,
        };
      }
      return { ...item, isEditing: false };
    });
    setFacilities(updatedFacilities);
    saveFacilitiesToLocalStorage(updatedFacilities);
  };

  const handleSave = (id) => {
    const updatedFacilities = facilities.map((item) => {
      if (item.id === id) {
        setIsEditingFacility(false);
        return { ...item, isEditing: false, facilityName: item.editedName };
      }
      return item;
    });
    setFacilities(updatedFacilities);
    saveFacilitiesToLocalStorage(updatedFacilities);
  };

  const handleDelete = (id) => {
    const updatedFacilities = facilities.filter((item) => item.id !== id);
    setFacilities(updatedFacilities);
    saveFacilitiesToLocalStorage(updatedFacilities);
  };

  const handleOutsideClick = () => {
    if (isAddingNewFacility && !isEditingFacility) {
      setIsAddingNewFacility(false);
      setShowInput(false);
    }

    if (isEditingFacility) {
      const updatedFacilities = facilities.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setFacilities(updatedFacilities);
      setIsEditingFacility(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>FACILITIES</h1>
          <DataTable
            facilities={facilities}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setFacilities={setFacilities}
            handleOutsideClick={handleOutsideClick}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newFacilityName}
                onChange={(e) => setNewFacilityName(e.target.value)}
                placeholder="Enter Facility name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewFacility(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />
              <SaveButton onSave={handleAddFacility} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

import React, { useState } from "react";
import { AddButton, EditButton, SaveButton, DeleteButton } from "../buttons";
import OutsideClickListener from "../event-listeners";
import {
  saveStandardsToLocalStorage,
  getStandardsFromLocalStorage,
} from "../local-storage";
import { AdminPropertyProperties } from "./property-properties";

function DataTableRow({
  standard,
  onEdit,
  onDelete,
  onSave,
  setStandards,
  standards,
}) {
  const handleInputChange = (e) => {
    const updatedStandards = standards.map((std) =>
      std.id === standard.id ? { ...std, editedName: e.target.value } : std
    );
    setStandards(updatedStandards);
  };

  return (
    <tr key={standard.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(standard.id)} />
      </td>
      <td className="StandardNameBox">
        {standard.isEditing ? (
          <input
            type="text"
            value={standard.editedName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          standard.standardName
        )}
      </td>
      <td className="SaveOrDeleteBTNBox">
        {standard.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(standard.id)} />
            <SaveButton onSave={() => onSave(standard.id)} />
          </>
        )}
      </td>
    </tr>
  );
}

function DataTable({
  standards,
  onEdit,
  onDelete,
  onSave,
  setStandards,
  isAddingNewStandard,
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
        {standards.map((item) => (
          <DataTableRow
            key={item.id}
            standard={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            setStandards={setStandards}
            isAddingNewStandard={isAddingNewStandard}
            standards={standards}
          />
        ))}
      </tbody>
    </table>
  );
}
export function AdminPropertyStandards() {
  const [standards, setStandards] = useState(
    getStandardsFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [newStandardName, setNewStandardName] = useState("");
  const [isAddingNewStandard, setIsAddingNewStandard] = useState(false);
  const [isEditingStandard, setIsEditingStandard] = useState(false);

  const handleAddButtonClick = () => {
    setNewStandardName("");
    setShowInput(true);
    setIsAddingNewStandard(true);
  };

  const handleAddStandard = () => {
    if (newStandardName.trim() !== "") {
      const isDuplicateName = standards.some(
        (standard) => standard.standardName === newStandardName
      );

      if (isDuplicateName) {
        alert(
          "Standard with this name already exists. Please choose a new name."
        );
        return;
      }

      const newStandard = {
        id: newStandardName,
        standardName: newStandardName,
        isEditing: false,
        editedName: "",
      };
      const updatedStandards = [...standards, newStandard];
      setStandards(updatedStandards);
      saveStandardsToLocalStorage(updatedStandards);
      setNewStandardName("");
      setShowInput(false);
      setIsAddingNewStandard(false);
    }
  };

  const handleEdit = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.standardName,
        };
      }
      return { ...item, isEditing: false };
    });
    setStandards(updatedStandards);
    saveStandardsToLocalStorage(updatedStandards);
  };

  const handleSave = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(false);
        return { ...item, isEditing: false, standardName: item.editedName };
      }
      return item;
    });
    setStandards(updatedStandards);
    saveStandardsToLocalStorage(updatedStandards);
  };

  const handleDelete = (id) => {
    const updatedStandards = standards.filter((item) => item.id !== id);
    setStandards(updatedStandards);
    saveStandardsToLocalStorage(updatedStandards);
  };

  const handleOutsideClick = () => {
    if (isAddingNewStandard && !isEditingStandard) {
      setIsAddingNewStandard(false);
      setShowInput(false);
    }

    if (isEditingStandard) {
      const updatedStandards = standards.map((item) => ({
        ...item,
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
          <h1>STANDARDS</h1>
          <DataTable
            standards={standards}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setStandards={setStandards}
            handleOutsideClick={handleOutsideClick}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newStandardName}
                onChange={(e) => setNewStandardName(e.target.value)}
                placeholder="Enter standard name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewStandard(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />
              <SaveButton onSave={handleAddStandard} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

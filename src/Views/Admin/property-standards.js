import React, { useState } from "react";
import {
  AddButton,
  EditButton,
  SaveButton,
  DeleteButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";

export function DataTable({
  standards,
  onEdit,
  onDelete,
  onSave,
  setStandards,
  isAddingNewStandard,
  isEditingStandard,
  handleOutsideClick,
}) {
  return (
    <table className="PropertyTable">
      <tbody>
        {standards.map((item) => (
          <tr key={item.id}>
            <td id="editBTNBox">
              <EditButton onEdit={() => onEdit(item.id)} />
            </td>
            <td id="standardNameBox">
              {" "}
              {/* Remove whitespace here */}
              {item.isEditing ? (
                <input
                  type="text"
                  value={item.editedName}
                  onChange={(e) => {
                    const updatedStandards = standards.map((standard) =>
                      standard.id === item.id
                        ? { ...standard, editedName: e.target.value }
                        : standard
                    );
                    setStandards(updatedStandards);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                item.standardName
              )}
            </td>
            <td id="saveOrDeleteBTNBox">
              {" "}
              {/* Remove whitespace here */}
              {item.isEditing && (
                <>
                  <DeleteButton onDelete={() => onDelete(item.id)} />
                  <SaveButton onSave={() => onSave(item.id)} />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AdminPropertyStandards() {
  const [standards, setStandards] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newStandardName, setNewStandardName] = useState("");
  const [isAddingNewStandard, setIsAddingNewStandard] = useState(false); // Define isAddingNewStandard
  const [isEditingStandard, setIsEditingStandard] = useState(false); // Define isEditingStandard

  const handleAddButtonClick = () => {
    setNewStandardName(""); // Reset new standard name when clicking add
    setShowInput(true);
    setIsAddingNewStandard(true); // Set isAddingNewStandard to true when starting to add
  };

  const handleAddStandard = () => {
    if (newStandardName.trim() !== "") {
      const newStandard = {
        id: standards.length + 1,
        standardName: newStandardName,
        isEditing: false,
        editedName: "",
      };
      setStandards((prevStandards) => [...prevStandards, newStandard]);
      setNewStandardName("");
      setShowInput(false);
      setIsAddingNewStandard(false); // Reset isAddingNewStandard when adding is complete
    }
  };

  const handleEdit = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(true); // Update isEditingStandard
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.standardName,
        };
      }
      return { ...item, isEditing: false };
    });
    setStandards(updatedStandards);
  };

  const handleSave = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(false); // Update isEditingStandard
        return { ...item, isEditing: false, standardName: item.editedName };
      }
      return item;
    });
    setStandards(updatedStandards);
  };

  const handleDelete = (id) => {
    const updatedStandards = standards.filter((item) => item.id !== id);
    setStandards(updatedStandards);
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
          <h1>PROPERTY STANDARDS</h1>
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
                  setIsAddingNewStandard(true); // Set isAddingNewStandard to true when clicking inside the input
                }}
                onFocus={(e) => e.stopPropagation()} // Prevent onFocus from propagating
              />
              <SaveButton onSave={handleAddStandard} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

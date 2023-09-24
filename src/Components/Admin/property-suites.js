import React, { useState } from "react";
import {
  saveSuitesToLocalStorage,
  getSuitesFromLocalStorage,
} from "../local-storage";
import { EditButton, SaveButton, DeleteButton, AddButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

function DataTable({
  suites,
  standards,
  onEdit,
  onDelete,
  onSave,
  setSuites,
  isAddingNewSuite,
  isEditingSuite,
  handleOutsideClick,
  newSuite,
}) {
  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th className="ColHeadline">Name:</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {suites.map((item) => (
          <tr key={item.id}>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(item.id)} />
            </td>
            <td>
              {item.isEditing ? (
                <input
                  type="text"
                  value={item.editedName}
                  onChange={(e) => {
                    const updatedSuites = suites.map((suite) =>
                      suite.id === item.id
                        ? { ...suite, editedName: e.target.value }
                        : suite
                    );
                    setSuites(updatedSuites);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                item.suiteName
              )}
            </td>

            <td className="SaveOrDeleteBTNBox">
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

export function AdminPropertySuites() {
  const [suites, setSuites] = useState(getSuitesFromLocalStorage() || []);
  const [showInput, setShowInput] = useState(false);
  const [newSuiteName, setNewSuiteName] = useState("");
  const [isAddingNewSuite, setIsAddingNewSuite] = useState(false);
  const [isEditingSuite, setIsEditingSuite] = useState(false);

  const handleAddButtonClick = () => {
    const newSuite = {
      id: suites.length + 1,
      suiteName: "",
      isEditing: false,
      editedName: "",
    };

    setNewSuite(newSuite);
    setNewSuiteName("");
    setShowInput(true);
    setIsAddingNewSuite(true);
  };

  const handleAddSuite = () => {
    const isDuplicateName = suites.some(
      (suite) => suite.suiteName === newSuiteName
    );

    if (isDuplicateName) {
      alert("Suite with this name already exists. Please choose a new name.");
      return;
    }
    if (newSuiteName.trim() !== "") {
      const newSuiteToAdd = {
        id: newSuiteName,
        suiteName: newSuiteName,
        isEditing: false,
        editedName: "",
      };
      const updatedSuites = [...suites, newSuiteToAdd];
      setSuites(updatedSuites);
      saveSuitesToLocalStorage(updatedSuites);
      setNewSuite({
        ...newSuiteToAdd,
        suiteName: "",
        isEditing: false,
        editedName: "",
      });
      setShowInput(false);
      setIsAddingNewSuite(false);
    } else {
      alert("Please enter a suite name.");
    }
  };

  const [newSuite, setNewSuite] = useState({
    id: suites.length + 1,
    suiteName: newSuiteName,
    isEditing: false,
    editedName: "",
  });

  const handleEdit = (id) => {
    const updatedSuites = suites.map((item) => {
      if (item.id === id) {
        setIsEditingSuite(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.suiteName,
        };
      }
      return item;
    });

    const editedSuite = updatedSuites.find((item) => item.id === id);
    setNewSuite(editedSuite);

    setSuites(updatedSuites);
    saveSuitesToLocalStorage(updatedSuites);
  };

  const handleSave = (id) => {
    const updatedSuites = suites.map((item) => {
      if (item.id === id) {
        setIsEditingSuite(false);
        return {
          ...item,
          isEditing: false,
          suiteName: item.editedName,
        };
      }
      return item;
    });

    setSuites(updatedSuites);
    saveSuitesToLocalStorage(updatedSuites);
  };

  const handleDelete = (id) => {
    const updatedSuites = suites.filter((item) => item.id !== id);
    setSuites(updatedSuites);
    saveSuitesToLocalStorage(updatedSuites);
  };
  const handleOutsideClick = () => {
    if (isAddingNewSuite && !isEditingSuite) {
      setIsAddingNewSuite(false);
      setShowInput(false);
    }

    if (isEditingSuite) {
      const updatedSuites = suites.map((item) => ({
        ...item,
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
          <h1>SUITES</h1>
          <DataTable
            suites={suites}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setSuites={setSuites}
            isAddingNewSuite={isAddingNewSuite}
            isEditingSuite={isEditingSuite}
            handleOutsideClick={handleOutsideClick}
            newSuite={newSuite}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newSuiteName}
                onChange={(e) => setNewSuiteName(e.target.value)}
                placeholder="Enter suite name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewSuite(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />

              <SaveButton onSave={handleAddSuite} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

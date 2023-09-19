import React, { useEffect, useState } from "react";
import {
  saveSuitesToLocalStorage,
  getSuitesFromLocalStorage,
  getStandardsFromLocalStorage,
} from "../../Components/local-storage";
import {
  EditButton,
  SaveButton,
  DeleteButton,
  AddButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";

export function DataTable({
  suites,
  standards, // Receive standards as a prop
  onEdit,
  onDelete,
  onSave,
  setSuites,
  isAddingNewSuite,
  isEditingSuite,
  handleOutsideClick,
}) {
  return (
    <table className="PropertyTable">
      <tbody>
        {suites.map((item) => (
          <tr key={item.id}>
            <td id="editBTNBox">
              <EditButton onEdit={() => onEdit(item.id)} />
            </td>
            <td id="suitesNameBox">
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
            <td id="suitesStandardBox">
              <input list="standardOptions" />
              <datalist id="standardOptions">
                {standards.map((standard) => (
                  <option key={standard.id} value={standard.standardName} />
                ))}
              </datalist>
            </td>
            <td id="saveOrDeleteBTNBox">
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
  const [standards, setStandards] = useState([]);
  useEffect(() => {
    const savedStandards = getStandardsFromLocalStorage();
    if (savedStandards) {
      setStandards(savedStandards);
    }
  }, []);
  const handleAddButtonClick = () => {
    setNewSuiteName("");
    setShowInput(true);
    setIsAddingNewSuite(true);
  };

  const handleAddSuite = () => {
    if (newSuiteName.trim() !== "") {
      const newSuite = {
        id: suites.length + 1,
        suiteName: newSuiteName,
        isEditing: false,
        editedName: "",
      };
      const updatedSuites = [...suites, newSuite];
      setSuites(updatedSuites);
      saveSuitesToLocalStorage(updatedSuites);
      setNewSuiteName("");
      setShowInput(false);
      setIsAddingNewSuite(false);
    }
  };

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
      return { ...item, isEditing: false };
    });
    setSuites(updatedSuites);
    saveSuitesToLocalStorage(updatedSuites);
  };

  const handleSave = (id) => {
    const updatedSuites = suites.map((item) => {
      if (item.id === id) {
        setIsEditingSuite(false);
        return { ...item, isEditing: false, suiteName: item.editedName };
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
          <h1>PROPERTY SUITES</h1>
          <DataTable
            suites={suites}
            standards={standards} // Pass the standards here
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setSuites={setSuites}
            handleOutsideClick={handleOutsideClick}
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

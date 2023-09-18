import React, { useState } from "react";
import {
  AddButton,
  EditButton,
  SaveButton,
  DeleteButton,
  CancelButton,
} from "../../Components/buttons";

export function DataTable({
  standards,
  onEdit,
  onDelete,
  onSave,
  setStandards,
}) {
  const handleCancel = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: false, editedName: item.standardName };
      }
      return item;
    });
    setStandards(updatedStandards);
  };

  return (
    <table className="PropertyTable">
      <tbody>
        {standards.map((item) => (
          <tr key={item.id}>
            <td id="editBTNBox">
              <EditButton onEdit={() => onEdit(item.id)} />
            </td>
            <td id="standardNameBox">
              {item.isEditing ? (
                <input
                  type="text"
                  value={item.editedName}
                  onChange={(e) => {
                    const updatedStandards = standards.map((standard) => {
                      if (standard.id === item.id) {
                        return { ...standard, editedName: e.target.value };
                      }
                      return standard;
                    });
                    setStandards(updatedStandards);
                  }}
                />
              ) : (
                item.standardName
              )}
            </td>
            <td id="saveOrDeleteBTNBox">
              {item.isEditing ? (
                <React.Fragment>
                  <CancelButton onCancel={() => handleCancel(item.id)} />
                  <DeleteButton onDelete={() => onDelete(item.id)} />
                  <SaveButton onSave={() => onSave(item.id)} />
                </React.Fragment>
              ) : null}
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

  const handleAddButtonClick = () => {
    setShowInput(true);
  };

  const handleAddStandard = () => {
    if (newStandardName.trim() !== "") {
      const newStandard = {
        id: standards.length + 1,
        standardName: newStandardName,
        isEditing: false,
        editedName: "",
      };
      setStandards([...standards, newStandard]);
      setNewStandardName("");
      setShowInput(false);
    }
  };

  const handleEdit = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: true, editedName: item.standardName };
      }
      return { ...item, isEditing: false };
    });
    setStandards(updatedStandards);
  };

  const handleCancel = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: false, editedName: item.standardName };
      }
      return item;
    });
    setStandards(updatedStandards);
  };

  const handleSave = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
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

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY STANDARDS</h1>
        <DataTable
          standards={standards}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          setStandards={setStandards}
        />
        {!showInput && <AddButton onAdd={handleAddButtonClick} />}
        {showInput && (
          <div className="AddContent">
            <input
              type="text"
              value={newStandardName}
              onChange={(e) => setNewStandardName(e.target.value)}
              placeholder="Enter standard name"
            />
            <SaveButton onSave={handleAddStandard} />
          </div>
        )}
      </div>
    </div>
  );
}

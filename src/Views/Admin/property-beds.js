import React, { useEffect, useState } from "react";
import {
  saveBedsToLocalStorage,
  getBedsFromLocalStorage,
} from "../../Components/local-storage";
import {
  EditButton,
  SaveButton,
  DeleteButton,
  AddButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";

export function DataTable({
  beds,
  bedSize,
  onEdit,
  onDelete,
  onSave,
  setBeds,
  setBedSize,
  isAddingNewBed,
  isEditingBed,
  isEditingBedSize,
  handleOutsideClick,
  newBed,
}) {
  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th className="ColHeadline">Name:</th>
          <th className="ColHeadline">Size:</th>
          <th className="ColHeadline">Prs:</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {beds.map((item) => (
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
                    const updatedBeds = beds.map((bed) =>
                      bed.id === item.id
                        ? { ...bed, editedName: e.target.value }
                        : bed
                    );
                    setBeds(updatedBeds);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                item.bedName
              )}
            </td>
            <td className="BedSizeBox">
              {item.isEditing ? (
                <div className="InputWithDatalist">
                  <input
                    className="smallInput"
                    type="text"
                    value={item.selectedBedSize}
                    onChange={(e) => {
                      const updatedBeds = beds.map((bed) =>
                        bed.id === item.id
                          ? { ...bed, selectedBedSize: e.target.value }
                          : bed
                      );
                      setBeds(updatedBeds);
                    }}
                    placeholder="Enter bed size (e.g., 140)"
                    maxLength="3"
                  />
                </div>
              ) : (
                item.selectedBedSize || "N/A"
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

export function AdminPropertyBeds() {
  const [beds, setBeds] = useState(getBedsFromLocalStorage() || []);
  const [showInput, setShowInput] = useState(false);
  const [newBedName, setNewBedName] = useState("");
  const [isAddingNewBed, setIsAddingNewBed] = useState(false);
  const [isEditingBed, setIsEditingBed] = useState(false);
  const [bedSize, setBedSize] = useState([]);

  const handleAddButtonClick = () => {
    const newBed = {
      id: beds.length + 1,
      bedName: "",
      isEditing: false,
      editedName: "",
      selectedBedSize: "", // Initialize with an empty string
    };

    setNewBed(newBed);
    setNewBedName("");
    setShowInput(true);
    setIsAddingNewBed(true);
  };

  const handleAddBed = () => {
    const selectedBedSize = newBed.selectedBedSize;
    const uniqueId = new Date().getTime(); // Generate a unique ID using timestamp
    if (newBedName.trim() !== "" && selectedBedSize.trim() !== "") {
      const newBedToAdd = {
        id: uniqueId, // Use the unique ID
        bedName: newBedName,
        isEditing: false,
        editedName: "",
        selectedBedSize: selectedBedSize,
      };
      const updatedBeds = [...beds, newBedToAdd];
      setBeds(updatedBeds);
      saveBedsToLocalStorage(updatedBeds);
      setNewBed({
        // Reset newSuite to its initial state
        id: uniqueId, // Reset newSuite with the unique ID
        bedName: "",
        isEditing: false,
        editedName: "",
        selectedBedSize: "",
      });
      setShowInput(false);
      setIsAddingNewBed(false);
    } else {
      alert("Please enter a bed name and a size.");
    }
  };

  const [newBed, setNewBed] = useState({
    id: beds.length + 1,
    bedName: newBedName,
    isEditing: false,
    editedName: "",
    selectedBedSize: "", // Initialize selectedStandard
  });

  const handleEdit = (id) => {
    const updatedBeds = beds.map((item) => {
      if (item.id === id) {
        setIsEditingBed(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.bedName,
        };
      }
      return { ...item, isEditing: false };
    });

    // Find the edited suite to pass to DataTable
    const editedBed = updatedBeds.find((item) => item.id === id);
    setNewBed(editedBed); // Pass the edited suite to newSuite

    setBeds(updatedBeds);
    saveBedsToLocalStorage(updatedBeds);
  };

  const handleSave = (id) => {
    const uniqueId = new Date().getTime();
    const updatedBeds = beds.map((item) => {
      if (item.id === id) {
        setIsEditingBed(false);
        return {
          ...item,
          isEditing: false,
          bedName: item.editedName,
          selectedBedSize: item.selectedBedSize, // Include the selected standard
          id: uniqueId,
        };
      }
      return item;
    });
    setBeds(updatedBeds);
    saveBedsToLocalStorage(updatedBeds);
  };

  const handleDelete = (id) => {
    const updatedBeds = beds.filter((item) => item.id !== id);
    setBeds(updatedBeds);
    saveBedsToLocalStorage(updatedBeds);
  };
  const handleOutsideClick = () => {
    if (isAddingNewBed && !isEditingBed) {
      setIsAddingNewBed(false);
      setShowInput(false);
    }

    if (isEditingBed) {
      const updatedBeds = beds.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setBeds(updatedBeds);
      setIsEditingBed(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>PROPERTY BEDS</h1>
          <DataTable
            beds={beds}
            bedSize={bedSize}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setBeds={setBeds}
            isAddingNewBed={isAddingNewBed} // Pass the isAddingNewSuite prop
            isEditingBed={isEditingBed} // Pass the isEditingSuite prop
            handleOutsideClick={handleOutsideClick}
            newBed={newBed}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newBedName}
                onChange={(e) => setNewBedName(e.target.value)}
                placeholder="Enter bed name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewBed(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />

              <input
                className="smallInput"
                type="text"
                value={newBed.selectedBedSize}
                onChange={(e) => {
                  const input = e.target.value;
                  const truncatedInput = input.slice(0, 3); // Limit to 3 characters

                  // Update the newBed state with the updated selectedBedSize
                  setNewBed((prevNewBed) => ({
                    ...prevNewBed,
                    selectedBedSize: truncatedInput,
                  }));

                  // Update the beds state based on the newBed's ID
                  const updatedBeds = beds.map((bed) =>
                    bed.id === newBed.id
                      ? { ...bed, selectedBedSize: truncatedInput }
                      : bed
                  );

                  setBeds(updatedBeds);
                }}
                placeholder="CM"
                maxLength="3" // Limit to 3 characters
              />

              <SaveButton onSave={handleAddBed} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

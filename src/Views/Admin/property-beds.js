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

export function DataTableRow({ bed, beds, onEdit, onDelete, onSave, setBeds }) {
  const handleNameChange = (e) => {
    const updatedBeds = beds.map((bedItem) =>
      bedItem.id === bed.id
        ? { ...bedItem, editedName: e.target.value }
        : bedItem
    );
    setBeds(updatedBeds);
  };

  const handleBedSizeChange = (e) => {
    const updatedBeds = beds.map((bedItem) =>
      bedItem.id === bed.id
        ? { ...bedItem, selectedBedSize: e.target.value }
        : bedItem
    );
    setBeds(updatedBeds);
  };

  const handleBedPersonsChange = (e) => {
    const updatedBeds = beds.map((bedItem) =>
      bedItem.id === bed.id
        ? { ...bedItem, selectedBedPersons: e.target.value }
        : bedItem
    );
    setBeds(updatedBeds);
  };

  return (
    <tr key={bed.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(bed.id)} />
      </td>
      <td className="BedsNameBox">
        {bed.isEditing ? (
          <input
            type="text"
            value={bed.editedName}
            onChange={handleNameChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          bed.bedName
        )}
      </td>
      <td className="BedSizeBox">
        {bed.isEditing ? (
          <div className="InputWithDatalist">
            <input
              className="smallInput"
              type="text"
              value={bed.selectedBedSize}
              onChange={handleBedSizeChange}
              placeholder="CM"
              maxLength="3"
            />
          </div>
        ) : (
          bed.selectedBedSize || "N/A"
        )}
      </td>
      <td className="BedPersonsBox">
        {bed.isEditing ? (
          <div className="InputWithDatalist">
            <input
              className="smallInput"
              type="text"
              value={bed.selectedBedPersons}
              onChange={handleBedPersonsChange}
              placeholder="PRS"
              maxLength="3"
            />
          </div>
        ) : (
          bed.selectedBedPersons || "N/A"
        )}
      </td>

      <td className="SaveOrDeleteBTNBox">
        {bed.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(bed.id)} />
            <SaveButton onSave={() => onSave(bed.id)} />
          </>
        )}
      </td>
    </tr>
  );
}

function DataTable({ beds, onEdit, onDelete, onSave, setBeds }) {
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
        {beds.map((bed) => (
          <DataTableRow
            key={bed.id}
            bed={bed}
            beds={beds}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            setBeds={setBeds}
          />
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

  const handleAddButtonClick = () => {
    const newBed = {
      id: beds.length + 1,
      bedName: "",
      isEditing: false,
      editedName: "",
      selectedBedSize: "",
    };

    setNewBed(newBed);
    setNewBedName("");
    setShowInput(true);
    setIsAddingNewBed(true);
  };

  const handleAddBed = () => {
    const selectedBedSize = newBed.selectedBedSize;
    const selectedBedPersons = newBed.selectedBedPersons;
    const isDuplicateName = beds.some((bed) => bed.bedName === newBedName);

    if (isDuplicateName) {
      alert("Bed with this name already exists. Please choose a new name.");
      return;
    }
    if (
      newBedName.trim() !== "" &&
      selectedBedSize.trim() !== "" &&
      selectedBedPersons.trim() !== ""
    ) {
      const newBedToAdd = {
        id: newBedName,
        bedName: newBedName,
        isEditing: false,
        editedName: "",
        selectedBedSize: selectedBedSize,
        selectedBedPersons: selectedBedPersons,
      };
      const updatedBeds = [...beds, newBedToAdd];
      setBeds(updatedBeds);
      saveBedsToLocalStorage(updatedBeds);
      setNewBed({
        id: newBedName,
        bedName: "",
        isEditing: false,
        editedName: "",
        selectedBedSize: "",
        selectedBedPersons: "",
      });
      setShowInput(false);
      setIsAddingNewBed(false);
    } else {
      alert("Please enter a bed name, size and amount of persons.");
    }
  };

  const [newBed, setNewBed] = useState({
    id: beds.length + 1,
    bedName: newBedName,
    isEditing: false,
    editedName: "",
    selectedBedSize: "",
    selectedBedPersons: "",
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

    const editedBed = updatedBeds.find((item) => item.id === id);
    setNewBed(editedBed);

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
          selectedBedSize: item.selectedBedSize,
          id: uniqueId,
          selectedBedPersons: item.selectedBedPersons,
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
          <h1>BEDS</h1>
          <DataTable
            beds={beds}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={handleSave}
            setBeds={setBeds}
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
                  const truncatedInput = input.slice(0, 3);

                  setNewBed((prevNewBed) => ({
                    ...prevNewBed,
                    selectedBedSize: truncatedInput,
                  }));

                  const updatedBeds = beds.map((bed) =>
                    bed.id === newBed.id
                      ? { ...bed, selectedBedSize: truncatedInput }
                      : bed
                  );

                  setBeds(updatedBeds);
                }}
                placeholder="CM"
                maxLength="3"
              />
              <input
                className="smallInput"
                type="text"
                value={newBed.selectedBedPersons}
                onChange={(e) => {
                  const input = e.target.value;
                  const truncatedInput = input.slice(0, 3);

                  setNewBed((prevNewBed) => ({
                    ...prevNewBed,
                    selectedBedPersons: truncatedInput,
                  }));

                  const updatedBeds = beds.map((bed) =>
                    bed.id === newBed.id
                      ? { ...bed, selectedBedPersons: truncatedInput }
                      : bed
                  );

                  setBeds(updatedBeds);
                }}
                placeholder="PRS"
                maxLength="3"
              />
              <SaveButton onSave={handleAddBed} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

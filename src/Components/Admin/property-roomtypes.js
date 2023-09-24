import React, { useState } from "react";
import { AddButton, EditButton, SaveButton, DeleteButton } from "../buttons";
import OutsideClickListener from "../event-listeners";
import {
  saveRoomtypesToLocalStorage,
  getRoomtypesFromLocalStorage,
} from "../local-storage";
import { AdminPropertyProperties } from "./property-properties";

function DataTableRow({
  roomtype,
  onEdit,
  onDelete,
  onSave,
  setRoomtypes,
  roomtypes,
}) {
  const handleInputChange = (e) => {
    const updatedRoomtypes = roomtypes.map((rmt) =>
      rmt.id === roomtype.id ? { ...rmt, editedName: e.target.value } : rmt
    );
    setRoomtypes(updatedRoomtypes);
  };

  return (
    <tr key={roomtype.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(roomtype.id)} />
      </td>
      <td className="RoomtypeNameBox">
        {roomtype.isEditing ? (
          <input
            type="text"
            value={roomtype.editedName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          roomtype.roomtypeName
        )}
      </td>
      <td className="SaveOrDeleteBTNBox">
        {roomtype.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(roomtype.id)} />
            <SaveButton onSave={() => onSave(roomtype.id)} />
          </>
        )}
      </td>
    </tr>
  );
}

function DataTable({
  roomtypes,
  onEdit,
  onDelete,
  onSave,
  setRoomtypes,
  isAddingNewRoomtype,
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
        {roomtypes.map((item) => (
          <DataTableRow
            key={item.id}
            roomtype={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            setRoomtypes={setRoomtypes}
            isAddingNewRoomtype={isAddingNewRoomtype}
            roomtypes={roomtypes}
          />
        ))}
      </tbody>
    </table>
  );
}
export function AdminPropertyRoomtypes() {
  const [roomtypes, setRoomtypes] = useState(
    getRoomtypesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [newRoomtypeName, setNewRoomtypeName] = useState("");
  const [isAddingNewRoomtype, setIsAddingNewRoomtype] = useState(false);
  const [isEditingRoomtype, setIsEditingRoomtype] = useState(false);

  const handleAddButtonClick = () => {
    setNewRoomtypeName("");
    setShowInput(true);
    setIsAddingNewRoomtype(true);
  };

  const handleAddRoomtype = () => {
    if (newRoomtypeName.trim() !== "") {
      const isDuplicateName = roomtypes.some(
        (roomtype) => roomtype.roomtypeName === newRoomtypeName
      );

      if (isDuplicateName) {
        alert(
          "Roomtype with this name already exists. Please choose a new name."
        );
        return;
      }

      const newRoomtype = {
        id: newRoomtypeName,
        roomtypeName: newRoomtypeName,
        isEditing: false,
        editedName: "",
      };
      const updatedRoomtypes = [...roomtypes, newRoomtype];
      setRoomtypes(updatedRoomtypes);
      saveRoomtypesToLocalStorage(updatedRoomtypes);
      setNewRoomtypeName("");
      setShowInput(false);
      setIsAddingNewRoomtype(false);
    }
  };

  const handleEdit = (id) => {
    const updatedRoomtypes = roomtypes.map((item) => {
      if (item.id === id) {
        setIsEditingRoomtype(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.roomtypeName,
        };
      }
      return { ...item, isEditing: false };
    });
    setRoomtypes(updatedRoomtypes);
    saveRoomtypesToLocalStorage(updatedRoomtypes);
  };

  const handleSave = (id) => {
    const updatedRoomtypes = roomtypes.map((item) => {
      if (item.id === id) {
        setIsEditingRoomtype(false);
        return { ...item, isEditing: false, roomtypeName: item.editedName };
      }
      return item;
    });
    setRoomtypes(updatedRoomtypes);
    saveRoomtypesToLocalStorage(updatedRoomtypes);
  };

  const handleDelete = (id) => {
    const updatedRoomtypes = roomtypes.filter((item) => item.id !== id);
    setRoomtypes(updatedRoomtypes);
    saveRoomtypesToLocalStorage(updatedRoomtypes);
  };

  const handleOutsideClick = () => {
    if (isAddingNewRoomtype && !isEditingRoomtype) {
      setIsAddingNewRoomtype(false);
      setShowInput(false);
    }

    if (isEditingRoomtype) {
      const updatedRoomtypes = roomtypes.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setRoomtypes(updatedRoomtypes);
      setIsEditingRoomtype(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>ROOMTYPES</h1>
          <DataTable
            roomtypes={roomtypes}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setRoomtypes={setRoomtypes}
            handleOutsideClick={handleOutsideClick}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newRoomtypeName}
                onChange={(e) => setNewRoomtypeName(e.target.value)}
                placeholder="Enter roomtype name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewRoomtype(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />
              <SaveButton onSave={handleAddRoomtype} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

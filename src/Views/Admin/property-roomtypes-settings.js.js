import React, { useEffect, useState } from "react";
import {
  getBedsFromLocalStorage,
  getRoomtypesFromLocalStorage,
  saveRoomtypesToLocalStorage,
} from "../../Components/local-storage";
import {
  EditButton,
  SaveButton,
  DeleteButton,
  AddButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";
import { AdminPropertyBeds } from "./property-beds";

export function DataTable({
  roomtypes,
  beds,
  onEdit,
  onDelete,
  onSave,
  setRoomtypes,
}) {
  const bedHeaders = beds.map((bed) => (
    <th className="ColHeadline" key={bed.id}>
      {bed.bedName}
    </th>
  ));
  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th className="ColHeadline">Roomtype:</th>
          {bedHeaders}
        </tr>
      </thead>
      <tbody>
        {roomtypes.map((item) => (
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
                    const updatedRoomtypes = roomtypes.map((roomtype) =>
                      roomtype.id === item.id
                        ? { ...roomtype, editedName: e.target.value }
                        : roomtype
                    );
                    setRoomtypes(updatedRoomtypes);
                  }}
                />
              ) : (
                item.roomtypeName
              )}
            </td>
            {beds.map((bed) => (
              <td key={bed.id} className="RoomtypeBedsBox">
                {item.isEditing ? (
                  <div className="InputWithDatalist">
                    <select
                      className="smallInput"
                      value={(item.bedOptions && item.bedOptions[bed.id]) || ""}
                      onChange={(e) => {
                        const updatedRoomtypes = roomtypes.map((roomtype) =>
                          roomtype.id === item.id
                            ? {
                                ...roomtype,
                                bedOptions: {
                                  ...roomtype.bedOptions,
                                  [bed.id]: parseInt(e.target.value, 10),
                                },
                              }
                            : roomtype
                        );
                        setRoomtypes(updatedRoomtypes);
                      }}
                    >
                      <option value="no_selection">
                        No. of {bed.bedName}:
                      </option>
                      {[...Array(11).keys()].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  (item.bedOptions && item.bedOptions[bed.id]) || "0"
                )}
              </td>
            ))}
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

export function AdminPropertyRoomtypesSettings() {
  const [roomtypes, setRoomtypes] = useState(
    getRoomtypesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [newRoomtypeName, setNewRoomtypeName] = useState("");
  const [isAddingNewRoomtype, setIsAddingNewRoomtype] = useState(false);
  const [isEditingRoomtype, setIsEditingRoomtype] = useState(false);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    const savedBeds = getBedsFromLocalStorage();
    if (savedBeds) {
      setBeds(savedBeds);
    }
  }, []);

  const handleAddButtonClick = () => {
    const newRoomtype = {
      id: roomtypes.length + 1,
      roomtypeName: "",
      isEditing: false,
      editedName: "",
      selectedAmountOfBeds: "",
    };

    setNewRoomtype(newRoomtype);
    setNewRoomtypeName("");
    setShowInput(true);
    setIsAddingNewRoomtype(true);
  };

  const handleAddRoomtype = () => {
    const isDuplicateName = roomtypes.some(
      (roomtype) => roomtype.roomtypeName === newRoomtypeName
    );

    if (isDuplicateName) {
      alert(
        "Roomtype with this name already exists. Please choose a new name."
      );
      return;
    }
    if (newRoomtypeName.trim() !== "") {
      const newRoomtypeToAdd = {
        id: newRoomtypeName,
        roomtypeName: newRoomtypeName,
        isEditing: false,
        editedName: "",
        bedOptions: {}, // Initialize as an empty object
      };
      const updatedRoomtypes = [...roomtypes, newRoomtypeToAdd];
      setRoomtypes(updatedRoomtypes);
      saveRoomtypesToLocalStorage(updatedRoomtypes);
      setNewRoomtype({
        id: newRoomtype,
        roomtypeName: "",
        isEditing: false,
        editedName: "",
        selectedBedOptions: "",
      });
      setShowInput(false);
      setIsAddingNewRoomtype(false);
    } else {
      alert("Please enter a room type name.");
    }
  };

  const handleBedOptionChange = (bedId, value) => {
    const updatedBedOptions = {
      ...newRoomtype.selectedBedOptions,
      [bedId]: value,
    };
    setNewRoomtype({
      ...newRoomtype,
      selectedBedOptions: updatedBedOptions,
    });
  };

  const [newRoomtype, setNewRoomtype] = useState({
    id: roomtypes.length + 1,
    roomtypesName: newRoomtypeName,
    isEditing: false,
    editedName: "",
    selectedAmountOfBeds: "", // Initialize selectedStandard
  });

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

    const editedRoomtype = updatedRoomtypes.find((item) => item.id === id);
    setNewRoomtype(editedRoomtype);

    setRoomtypes(updatedRoomtypes);
    saveRoomtypesToLocalStorage(updatedRoomtypes);
  };

  const handleSave = (id) => {
    const uniqueId = new Date().getTime();
    const updatedRoomtypes = roomtypes.map((item) => {
      if (item.id === id) {
        setIsEditingRoomtype(false);
        return {
          ...item,
          isEditing: false,
          roomtypeName: item.editedName,
          selectedAmountOfBeds: item.selectedAmountOfBeds,
          id: uniqueId,
        };
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
          <h1>PROPERTY ROOMTYPES</h1>
          <h2 className="SmallHeadline">No. of beds in Roomtype:</h2>
          <DataTable
            roomtypes={roomtypes}
            beds={beds}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setRoomtypes={setRoomtypes}
            isAddingNewRoomtype={isAddingNewRoomtype}
            isEditingRoomtype={isEditingRoomtype}
            handleOutsideClick={handleOutsideClick}
            newRoomtype={newRoomtype}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newRoomtypeName}
                onChange={(e) => setNewRoomtypeName(e.target.value)}
                placeholder="Enter Roomtype name"
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

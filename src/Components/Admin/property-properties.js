import React, { useEffect, useState } from "react";
import {
  getPropertiesFromLocalStorage,
  savePropertiesToLocalStorage,
} from "../local-storage";
import { AddButton, EditButton, SaveButton, DeleteButton } from "../buttons";
import OutsideClickListener from "../event-listeners";

function DataTableRow({
  propertie,
  onEdit,
  onDelete,
  onSave,
  setProperties,
  properties,
}) {
  const handleInputChange = (e) => {
    const updatedProperties = properties.map((prt) =>
      prt.id === propertie.id ? { ...prt, editedName: e.target.value } : prt
    );
    setProperties(updatedProperties);
  };

  return (
    <tr key={propertie.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(propertie.id)} />
      </td>
      <td className="PropertieNameBox">
        {propertie.isEditing ? (
          <input
            type="text"
            value={propertie.editedName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          propertie.propertieName
        )}
      </td>
      <td className="SaveOrDeleteBTNBox">
        {propertie.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(propertie.id)} />
            <SaveButton onSave={() => onSave(propertie.id)} />
          </>
        )}
      </td>
    </tr>
  );
}

function DataTable({
  properties,
  onEdit,
  onDelete,
  onSave,
  setProperties,
  isAddingNewPropertie,
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
        {properties.map((item) => (
          <DataTableRow
            key={item.id}
            propertie={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            setProperties={setProperties}
            isAddingNewPropertie={isAddingNewPropertie}
            properties={properties}
          />
        ))}
      </tbody>
    </table>
  );
}
export function AdminPropertyProperties() {
  const [properties, setProperties] = useState(
    getPropertiesFromLocalStorage() || []
  );
  const [showInput, setShowInput] = useState(false);
  const [newPropertieName, setNewPropertieName] = useState("");
  const [isAddingNewPropertie, setIsAddingNewPropertie] = useState(false);
  const [isEditingPropertie, setIsEditingPropertie] = useState(false);

  const handleAddButtonClick = () => {
    setNewPropertieName("");
    setShowInput(true);
    setIsAddingNewPropertie(true);
  };

  const handleAddPropertie = () => {
    if (newPropertieName.trim() !== "") {
      const isDuplicateName = properties.some(
        (propertie) => propertie.propertieName === newPropertieName
      );

      if (isDuplicateName) {
        alert(
          "Property with this name already exists. Please choose a new name."
        );
        return;
      }

      const newPropertie = {
        id: newPropertieName,
        propertieName: newPropertieName,
        isEditing: false,
        editedName: "",
      };
      const updatedProperties = [...properties, newPropertie];
      setProperties(updatedProperties);
      savePropertiesToLocalStorage(updatedProperties);
      setNewPropertieName("");
      setShowInput(false);
      setIsAddingNewPropertie(false);
    }
  };

  const handleEdit = (id) => {
    const updatedProperties = properties.map((item) => {
      if (item.id === id) {
        setIsEditingPropertie(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.propertieName,
        };
      }
      return { ...item, isEditing: false };
    });
    setProperties(updatedProperties);
    savePropertiesToLocalStorage(updatedProperties);
  };

  const handleSave = (id) => {
    const updatedProperties = properties.map((item) => {
      if (item.id === id) {
        setIsEditingPropertie(false);
        return { ...item, isEditing: false, propertieName: item.editedName };
      }
      return item;
    });
    setProperties(updatedProperties);
    savePropertiesToLocalStorage(updatedProperties);
  };

  const handleDelete = (id) => {
    const updatedProperties = properties.filter((item) => item.id !== id);
    setProperties(updatedProperties);
    savePropertiesToLocalStorage(updatedProperties);
  };

  const handleOutsideClick = () => {
    if (isAddingNewPropertie && !isEditingPropertie) {
      setIsAddingNewPropertie(false);
      setShowInput(false);
    }

    if (isEditingPropertie) {
      const updatedProperties = properties.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setProperties(updatedProperties);
      setIsEditingPropertie(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>PROPERTIES</h1>
          <DataTable
            properties={properties}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setProperties={setProperties}
            handleOutsideClick={handleOutsideClick}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newPropertieName}
                onChange={(e) => setNewPropertieName(e.target.value)}
                placeholder="Enter Property name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewPropertie(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />
              <SaveButton onSave={handleAddPropertie} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

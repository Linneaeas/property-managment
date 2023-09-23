import React, { useState } from "react";
import {
  AddButton,
  EditButton,
  SaveButton,
  DeleteButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../Components/local-storage";

export function useDataManagement(initialData, storageKey) {
  const [data, setData] = useState(
    getFromLocalStorage(storageKey) || initialData
  );

  const handleSaveToLocalStorage = (updatedData) => {
    setData(updatedData);
    saveToLocalStorage(storageKey, updatedData);
  };

  return {
    data,
    setData,
    handleSaveToLocalStorage,
  };
}

export function DataTableRow({ item, onEdit, onDelete, onSave }) {
  const handleInputChange = (e) => {
    // Handle input change
  };

  return (
    <tr key={item.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(item.id)} />
      </td>
      <td className="NameBox">
        {item.isEditing ? (
          <input
            type="text"
            value={item.editedName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          item.name
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
  );
}

function DataTableContainer({ data, onEdit, onDelete, onSave }) {
  return (
    <table className="PropertyTable">
      <tbody>
        {data.map((item) => (
          <DataTableRow
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
          />
        ))}
      </tbody>
    </table>
  );
}

import React from "react";
import { useState, useEffect } from "react";

const DataTable = ({ standards }) => {
  const handleEdit = (id) => {
    // Implement your edit logic here, using the item's ID
    console.log("Editing item with ID:", id);
  };

  return (
    <table className="PropertyTable">
      <tbody>
        {standards.map((item) => (
          <tr key={item.id}>
            <td id="EditBTNBox">
              <button
                className="EditBTN"
                onClick={() => handleEdit(item.id)}
              ></button>
            </td>
            <td id="StandardNameBox">{item.standardName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AdminPropertyStandards = () => {
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
      };
      setStandards([...standards, newStandard]);
      setNewStandardName("");
      setShowInput(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY STANDARDS</h1>
        <DataTable standards={standards} />
        {!showInput && (
          <button className="AddBTN" onClick={handleAddButtonClick}>
            Add
          </button>
        )}
        {showInput && (
          <div>
            <input
              type="text"
              value={newStandardName}
              onChange={(e) => setNewStandardName(e.target.value)}
              placeholder="Enter standard name"
            />
            <button className="SaveBTN" onClick={handleAddStandard}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPropertyStandards;

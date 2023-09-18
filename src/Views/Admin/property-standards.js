import React from "react";

const DataTable = ({ data }) => {
  const handleEdit = (id) => {
    // Implement your edit logic here, using the item's ID
    console.log("Editing item with ID:", id);
  };

  return (
    <table className="PropertyTable">
      <thead>
        <tr id="TRTableHeadline">
          <th id="THTableHeadline">EDIT:</th>
          <th id="THTableHeadline">NAME:</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td id="EditBTNBox">
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </td>
            <td id="StandardNameBox">{item.standardName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AdminPropertyStandards = () => {
  const data = [
    { id: 1, standardName: "Standard 1" },
    { id: 2, standardName: "Standard 2" },
  ];

  return (
    <div className="PropertyContainer">
      <div className="PropertyContent">
        <h1>PROPERTY STANDARDS</h1>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default AdminPropertyStandards;

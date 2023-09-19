import React, { useState } from "react";
import {
  AddButton,
  EditButton,
  SaveButton,
  DeleteButton,
} from "../../Components/buttons";
import OutsideClickListener from "../../Components/event-listeners";
// DataTable component renders a table with rows based on standards data:
export function DataTable({
  standards,
  onEdit,
  onDelete,
  onSave,
  setStandards,
  isAddingNewStandard,
  isEditingStandard,
  handleOutsideClick,
}) {
  return (
    <table className="PropertyTable">
      <tbody>
        {/*{standards.map((item) => ( is using the map function on the standards array. It's iterating over each item in the standards array and creating elements for each:*/}
        {standards.map((item) => (
          <tr key={item.id}>
            {/*This is creating a table row (<tr>) for each item in the standards array. The key is used to uniquely identify each row.*/}
            <td id="editBTNBox">
              {/*This is creating a table cell (<td>) with the ID "editBTNBox".*/}
              <EditButton onEdit={() => onEdit(item.id)} />
              {/*This is rendering an EditButton component and passing it a function to call when clicked, which calls the onEdit function with the item.id.*/}
            </td>
            <td id="standardNameBox">
              {/*This is creating a table cell (<td>) with the ID "standardNameBox".*/}
              {/*{item.isEditing ? (...) : (...)}: This is a conditional rendering based on the isEditing property of the item. If isEditing is true, it renders an input field; otherwise, it renders the standard name.*/}
              {item.isEditing ? (
                <input
                  type="text"
                  value={item.editedName}
                  /*onChange={(e) => {...}}: This is an event handler for when the input value changes. It's using an arrow function to define the behavior.Inside the function, it's creating a new array updatedStandards using map. It's iterating over each standard in the standards array.For the standard that matches the item.id, it's creating a new object using spread syntax ({ ...standard, editedName: e.target.value }). It copies all properties of the standard and updates the editedName to the new value from the input.For other standards, it keeps them unchanged.Finally, it calls setStandards to update the standards state with the new array of standards.onClick={(e) => e.stopPropagation()}: This is an event handler for the click event. It prevents the click event from propagating further up the DOM tree, stopping any parent elements from also receiving the click event.When the input value changes (when you type something in the input field), the onChange event handler updates the editedName for the respective standard in the standards array and then updates the state with the updated standards using setStandards. The value of the input is controlled by the editedName property of the item.*/
                  onChange={(e) => {
                    const updatedStandards = standards.map((standard) =>
                      standard.id === item.id
                        ? { ...standard, editedName: e.target.value }
                        : standard
                    );
                    setStandards(updatedStandards);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                item.standardName
              )}
            </td>
            <td id="saveOrDeleteBTNBox">
              {/* Render delete and save button when editing: */}
              {item.isEditing && (
                <>
                  <DeleteButton onDelete={() => onDelete(item.id)} />
                  <SaveButton onSave={() => onSave(item.id)} />
                  {/*<Rendering a DeleteButton component and passing it a function to call when clicked, which calls the onDelete function with the item.id.
                  Rendering a SaveButton component and passing it a function to call when clicked, which calls the onSave function with the item.id.*/}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// AdminPropertyStandards component for managing property standards
export function AdminPropertyStandards() {
  const [standards, setStandards] = useState([]); // State for property standards
  const [showInput, setShowInput] = useState(false); // State for input visibility
  const [newStandardName, setNewStandardName] = useState(""); // State for new standard name
  const [isAddingNewStandard, setIsAddingNewStandard] = useState(false); // Define isAddingNewStandard
  const [isEditingStandard, setIsEditingStandard] = useState(false); // Define isEditingStandard

  // Handler for add button click:
  const handleAddButtonClick = () => {
    setNewStandardName(""); // Reset new standard name when clicking add
    setShowInput(true); //Displaying Inputfield
    setIsAddingNewStandard(true); // Set isAddingNewStandard to true when starting to add
  };

  // Handler for adding a new standard:
  //if (newStandardName.trim() !== ""): This condition checks if the trimmed newStandardName (removing whitespace from the start and end) is not an empty string. It ensures that you're trying to add a standard only if the input is not empty or contains only whitespace.
  //const newStandard = { ... }: If the condition is met, a new newStandard object is created. This object represents the new standard you want to add. It contains properties like id (based on the length of the existing standards array plus 1), standardName (from the input), isEditing (initially set to false), and editedName (initially an empty string).
  const handleAddStandard = () => {
    if (newStandardName.trim() !== "") {
      const newStandard = {
        id: standards.length + 1,
        standardName: newStandardName,
        isEditing: false,
        editedName: "",
      };
      setStandards((prevStandards) => [...prevStandards, newStandard]); //This line updates the standards state using the setStandards function. It creates a new array that includes all the previous standards (prevStandards) using the spread operator (...), and appends the newStandard to the end of the array. This effectively adds the new standard to the list of standards.
      setNewStandardName(""); //This resets the newStandardName state to an empty string, effectively clearing the input field after adding a new standard.
      setShowInput(false); //his hides the input field by setting showInput state to false.
      setIsAddingNewStandard(false); //resets isAddingNewStandard to false, indicating that the process of adding a new standard is complete.
    }
  };

  // Handler for editing a standard
  //const handleEdit = (id) => { ... }: This is an arrow function named handleEdit that takes an id as an argument. This function is intended to handle the editing of a standard.
  //const updatedStandards = standards.map((item) => { ... }): This line creates a new array called updatedStandards by mapping over the standards array. The purpose is to create a new array with updated information about each standard.
  //if (item.id === id) { ... }: This condition checks if the id of the current item matches the provided id. If they match, it means this is the standard to be edited.
  //setIsEditingStandard(true);: This sets the isEditingStandard state to true, indicating that you are in the process of editing a standard.
  //return { ...item, isEditing: !item.isEditing, editedName: item.standardName };: This returns a new object representing the updated version of the current standard. It uses the spread operator (...) to copy all properties of the item. It toggles the isEditing property (using !item.isEditing) to switch between editing and not editing, and it sets editedName to the current standardName.
  //return { ...item, isEditing: false };: If the condition in step 3 is not met, meaning this is not the standard to be edited, this returns a new object with the same properties as the item but with isEditing set to false
  //setStandards(updatedStandards);: Finally, this updates the standards state using the setStandards function, replacing the existing standards with the updatedStandards.
  const handleEdit = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(true); // Update isEditingStandard
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.standardName,
        };
      }
      return { ...item, isEditing: false };
    });
    setStandards(updatedStandards);
  };

  // Handler for saving changes to a standard:
  const handleSave = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(false); // Update isEditingStandard
        return { ...item, isEditing: false, standardName: item.editedName };
      }
      return item;
    });
    setStandards(updatedStandards);
  };

  // Handler for deleting a standard:
  const handleDelete = (id) => {
    const updatedStandards = standards.filter((item) => item.id !== id);
    setStandards(updatedStandards);
  };

  // Handler for outside click to handle editing and adding states:
  //Creating a new Const since a lot or errors kept occouring so needed to specify the function. In Return: <OutsideClickListener onOutsideClick={handleOutsideClick}>, is telling the OutsideClickListener component, "Hey, when an outside click happens, don't use your default behavior; instead, use this handleOutsideClick function."
  const handleOutsideClick = () => {
    if (isAddingNewStandard && !isEditingStandard) {
      setIsAddingNewStandard(false);
      setShowInput(false);
    }

    if (isEditingStandard) {
      const updatedStandards = standards.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setStandards(updatedStandards);
      setIsEditingStandard(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>PROPERTY STANDARDS</h1>
          <DataTable
            standards={standards}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            setStandards={setStandards}
            handleOutsideClick={handleOutsideClick}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newStandardName}
                onChange={(e) => setNewStandardName(e.target.value)}
                placeholder="Enter standard name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewStandard(true); // Set isAddingNewStandard to true when clicking inside the input
                }}
                onFocus={(e) => e.stopPropagation()} // Prevent onFocus from propagating
              />
              <SaveButton onSave={handleAddStandard} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}

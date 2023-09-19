// Function to save standards to local storage
export const saveStandardsToLocalStorage = (standards) => {
  try {
    const serializedStandards = JSON.stringify(standards);
    localStorage.setItem("standards", serializedStandards);
  } catch (error) {
    console.error("Error saving standards to local storage:", error);
  }
};

// Function to get standards from local storage
export const getStandardsFromLocalStorage = () => {
  try {
    const serializedStandards = localStorage.getItem("standards");
    if (serializedStandards === null) {
      return undefined; // Standards not found in local storage
    }
    return JSON.parse(serializedStandards);
  } catch (error) {
    console.error("Error getting standards from local storage:", error);
    return undefined;
  }
};

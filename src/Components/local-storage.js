// STANDARDS
export const saveStandardsToLocalStorage = (standards) => {
  try {
    const serializedStandards = JSON.stringify(standards);
    localStorage.setItem("standards", serializedStandards);
  } catch (error) {
    console.error("Error saving standards to local storage:", error);
  }
};
export const getStandardsFromLocalStorage = () => {
  try {
    const serializedStandards = localStorage.getItem("standards");
    if (serializedStandards === null) {
      return undefined;
    }
    return JSON.parse(serializedStandards);
  } catch (error) {
    console.error("Error getting standards from local storage:", error);
    return undefined;
  }
};

//SUITES
export const saveSuitesToLocalStorage = (suites) => {
  try {
    const serializedSuites = JSON.stringify(suites);
    localStorage.setItem("suites", serializedSuites);
  } catch (error) {
    console.error("Error saving suites to local storage:", error);
  }
};
export const getSuitesFromLocalStorage = () => {
  try {
    const serializedSuites = localStorage.getItem("suites");
    if (serializedSuites === null) {
      return undefined;
    }
    return JSON.parse(serializedSuites);
  } catch (error) {
    console.error("Error getting suites from local storage:", error);
    return undefined;
  }
};

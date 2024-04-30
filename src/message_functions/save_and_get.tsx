import {Conversation, InfoDataTypes} from "../interface/SessionObjectInterfaces";



export const saveToSessionStorage = (value: Conversation[] | InfoDataTypes, key: string) => {
  console.log("saveToSessionStorage gets renderd...");
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Cannot save the:", error);
  }
}


export const getFromSessionStorage = (key: string) => {
  console.log("getFromSessionStorage gets renderd...");
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Fehler beim Abrufen aus sessionStorage:", error);
    return null;
  }
}



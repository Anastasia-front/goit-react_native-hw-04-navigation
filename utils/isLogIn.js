import AsyncStorage from "@react-native-async-storage/async-storage";

export const setVariable = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Variable added successfully!");
  } catch (error) {
    console.log("Error adding variable:", error);
  }
};

export const getVariable = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      console.log("Variable value:", parsedValue);
      return value;
    }
    console.log("Variable not found");
    return null;
  } catch (error) {
    console.log("Error getting variable:", error);
    return null;
  }
};

export const removeVariable = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Variable removed successfully!");
  } catch (error) {
    console.log("Error removing variable:", error);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@nestmate_user';

// Save user to local storage
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user:', e);
  }
};

// Load user from local storage
export const loadUser = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading user:', e);
    return null;
  }
};

// Remove user (logout)
export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Error clearing user:', e);
  }
};

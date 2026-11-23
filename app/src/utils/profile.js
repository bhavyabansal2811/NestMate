import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@nestmate_profile';

// Save full profile (personal info + preferences)
export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
};

// Load profile from storage
export const loadProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading profile:', e);
    return null;
  }
};

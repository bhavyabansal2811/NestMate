import AsyncStorage from '@react-native-async-storage/async-storage';

const SHORTLIST_KEY = '@nestmate_shortlist';

export const loadShortlist = async () => {
  try {
    const data = await AsyncStorage.getItem(SHORTLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading shortlist:', e);
    return [];
  }
};

export const toggleShortlist = async (profile) => {
  try {
    const current = await loadShortlist();
    const exists = current.some((p) => p.id === profile.id);
    const updated = exists
      ? current.filter((p) => p.id !== profile.id)
      : [...current, profile];
    await AsyncStorage.setItem(SHORTLIST_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error toggling shortlist:', e);
    return [];
  }
};

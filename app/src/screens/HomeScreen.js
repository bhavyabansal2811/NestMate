import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import mockProfiles from '../data/mockProfiles.json';
import RoommateCard from '../components/RoommateCard';
import { getCompatibilityScore } from '../utils/compatibility';
import { loadProfile } from '../utils/profile';
import { loadShortlist, toggleShortlist } from '../utils/shortlist';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState([]);
  const [userPrefs, setUserPrefs] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);

  useEffect(() => {
    const init = async () => {
      const profile = await loadProfile();
      setUserPrefs(profile?.preferences || null);

      const saved = await loadShortlist();
      setShortlisted(saved);
    };
    init();
    setProfiles(mockProfiles);
  }, []);

  const handleShortlist = async (profile) => {
    const updated = await toggleShortlist(profile);
    setShortlisted(updated);
  };

  const renderItem = ({ item }) => {
    const score = getCompatibilityScore(userPrefs, item.preferences);
    const isShortlisted = shortlisted.some((s) => s.id === item.id);
    return (
      <RoommateCard
        profile={item}
        score={score}
        onShortlist={handleShortlist}
        isShortlisted={isShortlisted}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔍 Find Roommates</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
});

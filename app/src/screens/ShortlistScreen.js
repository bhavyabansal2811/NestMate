import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadShortlist, toggleShortlist } from '../utils/shortlist';
import { loadProfile } from '../utils/profile';
import { getCompatibilityScore } from '../utils/compatibility';
import RoommateCard from '../components/RoommateCard';

export default function ShortlistScreen() {
  const [shortlisted, setShortlisted] = useState([]);
  const [userPrefs, setUserPrefs] = useState(null);

  // Reload every time the tab is focused
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const profile = await loadProfile();
        setUserPrefs(profile?.preferences || null);
        const saved = await loadShortlist();
        setShortlisted(saved);
      };
      load();
    }, [])
  );

  const handleRemove = async (profile) => {
    const updated = await toggleShortlist(profile);
    setShortlisted(updated);
  };

  const renderItem = ({ item }) => {
    const score = getCompatibilityScore(userPrefs, item.preferences);
    return (
      <RoommateCard
        profile={item}
        score={score}
        onShortlist={handleRemove}
        isShortlisted={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⭐ Shortlisted</Text>

      {shortlisted.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No roommates shortlisted yet.</Text>
          <Text style={styles.emptyHint}>Tap ☆ on any card in Browse to save them here.</Text>
        </View>
      ) : (
        <FlatList
          data={shortlisted}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  emptyIcon: {
    fontSize: 56,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
  },
  emptyHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

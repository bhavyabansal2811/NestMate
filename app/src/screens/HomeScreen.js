import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import mockProfiles from '../data/mockProfiles.json';
import RoommateCard from '../components/RoommateCard';
import FilterModal from '../components/FilterModal';
import { getCompatibilityScore } from '../utils/compatibility';
import { loadProfile } from '../utils/profile';
import { loadShortlist, toggleShortlist } from '../utils/shortlist';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [userPrefs, setUserPrefs] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);
  const [filters, setFilters] = useState({ minBudget: null, maxBudget: null, college: '', gender: 'All' });
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      const profile = await loadProfile();
      setUserPrefs(profile?.preferences || null);
      const saved = await loadShortlist();
      setShortlisted(saved);
    };
    init();
  }, []);

  // Apply filters every time filters change
  useEffect(() => {
    let result = mockProfiles;
    if (filters.minBudget) result = result.filter((p) => p.budget >= filters.minBudget);
    if (filters.maxBudget) result = result.filter((p) => p.budget <= filters.maxBudget);
    if (filters.college) result = result.filter((p) =>
      p.college.toLowerCase().includes(filters.college.toLowerCase())
    );
    if (filters.gender && filters.gender !== 'All')
      result = result.filter((p) => p.gender === filters.gender);
    setProfiles(result);
  }, [filters]);

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

  const activeFilterCount = [
    filters.minBudget, filters.maxBudget, filters.college,
    filters.gender !== 'All' ? filters.gender : null,
  ].filter(Boolean).length;

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.heading}>🔍 Find Roommates</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {profiles.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No roommates match your filters.</Text>
        </View>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
        currentFilters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', paddingHorizontal: 14, paddingTop: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  filterBtn: {
    backgroundColor: '#4A90D9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  list: { paddingBottom: 20 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
});

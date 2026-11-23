import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import mockProfiles from '../data/mockProfiles.json';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // In a real app this would fetch from storage or API
    setProfiles(mockProfiles);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>College: {item.college}</Text>
      <Text>Budget: ${item.budget}</Text>
      <Text>Gender: {item.gender}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    elevation: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

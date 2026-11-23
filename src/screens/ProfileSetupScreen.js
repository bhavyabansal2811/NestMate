import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { saveProfile } from '../utils/profile';

// Options for each preference
const SLEEP_OPTIONS = ['Early Bird', 'Night Owl', 'Flexible'];
const CLEANLINESS_OPTIONS = ['Very Neat', 'Moderate', 'Messy'];
const DIET_OPTIONS = ['Veg', 'Non-Veg', 'Vegan'];
const SMOKING_OPTIONS = ['No', 'Yes', 'Occasionally'];

export default function ProfileSetupScreen({ navigation }) {
  // Personal info
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [college, setCollege] = useState('');
  const [budget, setBudget] = useState('');
  const [gender, setGender] = useState('');

  // Lifestyle preferences
  const [sleep, setSleep] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [diet, setDiet] = useState('');
  const [smoking, setSmoking] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !age.trim() || !college.trim() || !budget.trim() || !gender.trim()) {
      Alert.alert('Incomplete', 'Please fill in all personal details.');
      return;
    }
    if (!sleep || !cleanliness || !diet || !smoking) {
      Alert.alert('Incomplete', 'Please select all lifestyle preferences.');
      return;
    }

    const profile = {
      name,
      age: parseInt(age),
      college,
      budget: parseInt(budget),
      gender,
      preferences: { sleep, cleanliness, diet, smoking },
    };

    await saveProfile(profile);
    navigation.replace('MainTabs');
  };

  // Reusable option selector row
  const OptionSelector = ({ label, options, selected, onSelect }) => (
    <View style={styles.selectorGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionBtn, selected === opt && styles.optionBtnSelected]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.optionText, selected === opt && styles.optionTextSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>
      <Text style={styles.subtitle}>Tell us about yourself</Text>

      {/* Personal Info */}
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="College / Workplace" value={college} onChangeText={setCollege} />
      <TextInput style={styles.input} placeholder="Monthly Budget (₹)" value={budget} onChangeText={setBudget} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Gender (Male / Female / Other)" value={gender} onChangeText={setGender} />

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Lifestyle Preferences</Text>
      <OptionSelector label="Sleep Schedule" options={SLEEP_OPTIONS} selected={sleep} onSelect={setSleep} />
      <OptionSelector label="Cleanliness" options={CLEANLINESS_OPTIONS} selected={cleanliness} onSelect={setCleanliness} />
      <OptionSelector label="Diet" options={DIET_OPTIONS} selected={diet} onSelect={setDiet} />
      <OptionSelector label="Smoking" options={SMOKING_OPTIONS} selected={smoking} onSelect={setSmoking} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90D9',
    marginBottom: 4,
    marginTop: 48,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  selectorGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  optionBtnSelected: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  optionText: {
    fontSize: 13,
    color: '#555',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4A90D9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

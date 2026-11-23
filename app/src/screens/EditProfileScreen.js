import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { loadProfile, saveProfile } from '../utils/profile';

const SLEEP_OPTIONS = ['Early Bird', 'Night Owl', 'Flexible'];
const CLEANLINESS_OPTIONS = ['Very Neat', 'Moderate', 'Messy'];
const DIET_OPTIONS = ['Veg', 'Non-Veg', 'Vegan'];
const SMOKING_OPTIONS = ['No', 'Yes', 'Occasionally'];

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [college, setCollege] = useState('');
  const [budget, setBudget] = useState('');
  const [gender, setGender] = useState('');

  const [sleep, setSleep] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [diet, setDiet] = useState('');
  const [smoking, setSmoking] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await loadProfile();
      if (data) {
        setName(data.name || '');
        setAge(data.age ? data.age.toString() : '');
        setCollege(data.college || '');
        setBudget(data.budget ? data.budget.toString() : '');
        setGender(data.gender || '');
        if (data.preferences) {
          setSleep(data.preferences.sleep || '');
          setCleanliness(data.preferences.cleanliness || '');
          setDiet(data.preferences.diet || '');
          setSmoking(data.preferences.smoking || '');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!name.trim() || !age.trim() || !college.trim() || !budget.trim() || !gender.trim()) {
      Alert.alert('Incomplete', 'Please fill in all personal details.');
      return;
    }
    if (!sleep || !cleanliness || !diet || !smoking) {
      Alert.alert('Incomplete', 'Please select all lifestyle preferences.');
      return;
    }

    setSaving(true);
    const updated = {
      name,
      age: parseInt(age) || 0,
      college,
      budget: parseInt(budget) || 0,
      gender,
      preferences: { sleep, cleanliness, diet, smoking },
    };

    await saveProfile(updated);
    setSaving(false);
    Alert.alert('Success', 'Profile and preferences updated successfully!');
  };

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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name ? name[0].toUpperCase() : '👤'}</Text>
        </View>
        <Text style={styles.title}>{name || 'My Profile'}</Text>
        <Text style={styles.subtitle}>Update your details & matching preferences</Text>
      </View>

      <Text style={styles.sectionTitle}>Personal Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="College / Workplace"
        value={college}
        onChangeText={setCollege}
      />
      <TextInput
        style={styles.input}
        placeholder="Monthly Budget (₹)"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender (Male / Female / Other)"
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.sectionTitle}>Lifestyle Preferences</Text>
      <OptionSelector label="Sleep Schedule" options={SLEEP_OPTIONS} selected={sleep} onSelect={setSleep} />
      <OptionSelector label="Cleanliness" options={CLEANLINESS_OPTIONS} selected={cleanliness} onSelect={setCleanliness} />
      <OptionSelector label="Dietary Habit" options={DIET_OPTIONS} selected={diet} onSelect={setDiet} />
      <OptionSelector label="Smoking Habit" options={SMOKING_OPTIONS} selected={smoking} onSelect={setSmoking} />

      <TouchableOpacity
        style={[styles.button, saving && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={saving}
      >
        <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save Profile Changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 14,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  selectorGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#f7f7f7',
  },
  optionBtnSelected: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  optionText: {
    fontSize: 12,
    color: '#555',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4A90D9',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const GENDER_OPTIONS = ['All', 'Male', 'Female', 'Other'];

export default function FilterModal({ visible, onClose, onApply, currentFilters }) {
  const [minBudget, setMinBudget] = useState(currentFilters?.minBudget?.toString() || '');
  const [maxBudget, setMaxBudget] = useState(currentFilters?.maxBudget?.toString() || '');
  const [college, setCollege] = useState(currentFilters?.college || '');
  const [gender, setGender] = useState(currentFilters?.gender || 'All');

  const handleApply = () => {
    onApply({
      minBudget: minBudget ? parseInt(minBudget) : null,
      maxBudget: maxBudget ? parseInt(maxBudget) : null,
      college: college.trim(),
      gender,
    });
    onClose();
  };

  const handleReset = () => {
    setMinBudget('');
    setMaxBudget('');
    setCollege('');
    setGender('All');
    onApply({ minBudget: null, maxBudget: null, college: '', gender: 'All' });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>🔽 Filter Roommates</Text>

          {/* Budget Range */}
          <Text style={styles.label}>Budget Range (₹/month)</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Min"
              value={minBudget}
              onChangeText={setMinBudget}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Max"
              value={maxBudget}
              onChangeText={setMaxBudget}
              keyboardType="numeric"
            />
          </View>

          {/* College */}
          <Text style={styles.label}>College / Workplace</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. IIT Delhi"
            value={college}
            onChangeText={setCollege}
          />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.optionRow}>
            {GENDER_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.optionBtn, gender === opt && styles.optionBtnSelected]}
                onPress={() => setGender(opt)}
              >
                <Text style={[styles.optionText, gender === opt && styles.optionTextSelected]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.applyBtn]} onPress={handleApply}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
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
  optionText: { fontSize: 13, color: '#555' },
  optionTextSelected: { color: '#fff', fontWeight: 'bold' },
  btn: {
    flex: 1,
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  applyBtn: {
    backgroundColor: '#4A90D9',
  },
  resetText: { color: '#555', fontWeight: '600' },
  applyText: { color: '#fff', fontWeight: 'bold' },
});

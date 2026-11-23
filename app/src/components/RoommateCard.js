import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RoommateCard({ profile, score, onShortlist, isShortlisted, onPressCard }) {
  const scoreColor =
    score >= 70 ? '#27ae60' : score >= 40 ? '#f39c12' : '#e74c3c';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPressCard && onPressCard(profile)}
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {profile.name ? profile.name[0].toUpperCase() : '?'}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.detail}>🎓 {profile.college}</Text>
        <Text style={styles.detail}>💰 ₹{profile.budget}/mo</Text>
        <Text style={styles.detail}>⚧ {profile.gender}</Text>
        <Text style={styles.hint}>View profile & habits →</Text>
      </View>

      {/* Match % + Shortlist */}
      <View style={styles.right}>
        <View style={[styles.scoreBadge, { backgroundColor: scoreColor }]}>
          <Text style={styles.scoreText}>{score}%</Text>
          <Text style={styles.scoreLabel}>match</Text>
        </View>
        <TouchableOpacity
          onPress={() => onShortlist(profile)}
          style={styles.bookmarkBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.bookmarkIcon}>{isShortlisted ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3,
  },
  detail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  hint: {
    fontSize: 11,
    color: '#4A90D9',
    fontWeight: '600',
    marginTop: 4,
  },
  right: {
    alignItems: 'center',
    gap: 8,
  },
  scoreBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 10,
  },
  bookmarkBtn: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 24,
    color: '#4A90D9',
  },
});

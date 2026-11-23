import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function RoommateDetailModal({
  visible,
  profile,
  userPrefs,
  score,
  isShortlisted,
  onShortlist,
  onClose,
}) {
  if (!profile) return null;

  const scoreColor =
    score >= 70 ? '#27ae60' : score >= 40 ? '#f39c12' : '#e74c3c';

  const habits = [
    {
      label: 'Sleep Schedule',
      icon: '🛏️',
      user: userPrefs?.sleep || 'Not set',
      theirs: profile.preferences?.sleep || 'Not set',
      matches: userPrefs && userPrefs.sleep === profile.preferences?.sleep,
      weight: '30%',
    },
    {
      label: 'Cleanliness',
      icon: '🧹',
      user: userPrefs?.cleanliness || 'Not set',
      theirs: profile.preferences?.cleanliness || 'Not set',
      matches: userPrefs && userPrefs.cleanliness === profile.preferences?.cleanliness,
      weight: '30%',
    },
    {
      label: 'Dietary Habit',
      icon: '🥗',
      user: userPrefs?.diet || 'Not set',
      theirs: profile.preferences?.diet || 'Not set',
      matches: userPrefs && userPrefs.diet === profile.preferences?.diet,
      weight: '20%',
    },
    {
      label: 'Smoking Habit',
      icon: '🚭',
      user: userPrefs?.smoking || 'Not set',
      theirs: profile.preferences?.smoking || 'Not set',
      matches: userPrefs && userPrefs.smoking === profile.preferences?.smoking,
      weight: '20%',
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {/* Header / Avatar */}
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile.name ? profile.name[0].toUpperCase() : '?'}
                </Text>
              </View>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.college}>🎓 {profile.college}</Text>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>💰 ₹{profile.budget}/mo</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>⚧ {profile.gender}</Text>
                </View>
              </View>

              {/* Match Score Badge */}
              <View style={[styles.scoreBadge, { backgroundColor: scoreColor }]}>
                <Text style={styles.scoreText}>{score}% Match</Text>
                <Text style={styles.scoreSub}>Based on your lifestyle habits</Text>
              </View>
            </View>

            {/* About Me / Bio */}
            {profile.bio && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.bioText}>{profile.bio}</Text>
              </View>
            )}

            {/* Compatibility Breakdown */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Compatibility Breakdown</Text>
              {habits.map((h, i) => (
                <View key={i} style={styles.habitRow}>
                  <Text style={styles.habitIcon}>{h.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.habitLabel}>{h.label}</Text>
                    <Text style={styles.habitCompare}>
                      Theirs: <Text style={styles.bold}>{h.theirs}</Text> • Yours: <Text style={styles.bold}>{h.user}</Text>
                    </Text>
                  </View>
                  <View style={[styles.matchChip, h.matches ? styles.matchYes : styles.matchNo]}>
                    <Text style={[styles.matchChipText, h.matches ? styles.matchYesText : styles.matchNoText]}>
                      {h.matches ? `+${h.weight} Match` : 'Differ'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Contact Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>{profile.phone || '+91 98000 00000'}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>✉️</Text>
                <Text style={styles.contactText}>{profile.email || `${profile.name?.toLowerCase().replace(/ /g, '.')}@example.com`}</Text>
              </View>
            </View>

            {/* Shortlist Toggle */}
            <TouchableOpacity
              style={[styles.shortlistBtn, isShortlisted && styles.shortlistBtnActive]}
              onPress={() => onShortlist(profile)}
            >
              <Text style={[styles.shortlistBtnText, isShortlisted && styles.shortlistBtnActiveText]}>
                {isShortlisted ? '★ Saved in Shortlist' : '☆ Add to Shortlist'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 20,
    paddingTop: 16,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  scroll: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  college: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  scoreSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    marginTop: 1,
  },
  section: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
  },
  habitIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  habitLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
  },
  habitCompare: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  bold: {
    fontWeight: '600',
    color: '#1e293b',
  },
  matchChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  matchYes: {
    backgroundColor: '#dcfce7',
  },
  matchYesText: {
    color: '#166534',
    fontSize: 11,
    fontWeight: 'bold',
  },
  matchNo: {
    backgroundColor: '#fee2e2',
  },
  matchNoText: {
    color: '#991b1b',
    fontSize: 11,
    fontWeight: 'bold',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  callBtn: {
    backgroundColor: '#4A90D9',
  },
  waBtn: {
    backgroundColor: '#25D366',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shortlistBtn: {
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A90D9',
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
  },
  shortlistBtnActive: {
    backgroundColor: '#4A90D9',
  },
  shortlistBtnText: {
    color: '#4A90D9',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shortlistBtnActiveText: {
    color: '#fff',
  },
});

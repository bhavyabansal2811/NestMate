/**
 * Compatibility scoring utility.
 * Compares user's saved preferences against a roommate profile.
 * Returns a score from 0 to 100.
 */

const WEIGHTS = {
  sleep: 30,
  cleanliness: 30,
  diet: 20,
  smoking: 20,
};

export const getCompatibilityScore = (userPrefs, roommatePrefs) => {
  if (!userPrefs || !roommatePrefs) return 0;

  let score = 0;

  if (userPrefs.sleep === roommatePrefs.sleep) score += WEIGHTS.sleep;
  if (userPrefs.cleanliness === roommatePrefs.cleanliness) score += WEIGHTS.cleanliness;
  if (userPrefs.diet === roommatePrefs.diet) score += WEIGHTS.diet;
  if (userPrefs.smoking === roommatePrefs.smoking) score += WEIGHTS.smoking;

  return score; // 0–100
};

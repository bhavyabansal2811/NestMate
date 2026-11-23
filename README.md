# 🏠 NestMate — Smart Roommate Matching App

A clean, user-friendly mobile application built with **React Native (Expo)** designed to help students and young flat-seekers find compatible flatmates based on lifestyle habits, budget, college, and personal preferences.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: React Native](https://img.shields.io/badge/Framework-React%20Native-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2058-black.svg)](https://expo.dev/)

---

## 📌 Project Overview

- **Project Title:** NestMate – Smart Roommate Matching Application
- **Student Name:** Bhavya Bansal
- **Degree:** B.Tech in Computer Science & Artificial Intelligence (CS-AI)
- **Category:** Minor Academic Project
- **Tech Stack:** React Native, Expo, React Navigation, AsyncStorage
- **Target Audience:** College students and young flat-seekers

---

## ✨ Key Features

| # | Feature | Description |
|---|---|---|
| 1️⃣ | **User Authentication** | On-device mock authentication with signup, login, and AsyncStorage session. |
| 2️⃣ | **Profile Creation** | Capture personal details (name, age, college/workplace, budget, gender). |
| 3️⃣ | **Preference Form** | Interactive questionnaire for lifestyle habits (sleep, cleanliness, diet, smoking). |
| 4️⃣ | **Browse Roommates** | Clean card feed displaying prospective flatmate profiles with match scores. |
| 5️⃣ | **Smart Search & Filters** | Filter modal to filter by budget range (min/max), college name, and gender. |
| 6️⃣ | **Compatibility Scoring** | Rule-based algorithm calculating matching percentage (0–100%) dynamically. |
| 7️⃣ | **Shortlist / Bookmarks** | Bookmark profiles with real-time sync and persistent storage. |
| 8️⃣ | **Edit Profile** | Update personal information and lifestyle preferences anytime with instant re-scoring. |
| 9️⃣ | **Detailed Profile View** | Tap any flatmate card to view their full bio, complete compatibility breakdown, and contact details. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation:** React Navigation (Native Stack + Bottom Tab Navigation)
- **Data Persistence:** `@react-native-async-storage/async-storage` (Offline-first local storage)
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`, `useFocusEffect`)
- **Matching Logic:** Rule-based weighted scoring comparing lifestyle preferences

---

## 📱 Application Flow

```text
[ Login / Sign Up ] ──▶ [ Profile Setup (Questionnaire) ]
                                    │
                                    ▼
                        [ Main App (Bottom Tabs) ]
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[ 🔍 Browse Feed ]           [ ⭐ Shortlist ]             [ 👤 My Profile ]
       │                                                         │
       └─▶ [ ⚙️ Filter Modal ]                                    └─▶ [ Edit Details & Habits ]
```

---

## 📁 Project Directory Structure

```text
NestMate/
├── LICENSE                 # MIT License
├── README.md               # Project documentation & guide
└── app/                    # Expo application root
    ├── assets/             # Icons and application images
    ├── src/
    │   ├── components/     # RoommateCard, FilterModal
    │   ├── data/           # mockProfiles.json (Sample student profiles)
    │   ├── navigation/     # AuthNavigator, TabNavigator
    │   ├── screens/        # LoginScreen, ProfileSetupScreen, HomeScreen, ShortlistScreen, EditProfileScreen
    │   └── utils/          # auth.js, profile.js, compatibility.js, shortlist.js
    ├── App.js              # Root navigation & app entry point
    ├── app.json            # Expo project configuration
    └── package.json        # Dependencies and scripts
```

---

## 🚀 Getting Started

Follow these steps to run the application on your physical device via **Expo Go**:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- **Expo Go** mobile app installed on your Android or iOS device

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhavyabansal2811/NestMate.git
   cd NestMate/app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Launch on your device:**
   - Scan the QR code shown in the terminal using the **Expo Go** app on your phone.

---

## 💡 How Compatibility Matching Works

The compatibility matching algorithm compares the logged-in student's preferences with prospective roommates across four weighted factors:

| Lifestyle Factor | Weight | Description |
|---|:---:|---|
| **Sleep Schedule** | 30% | Early Bird, Night Owl, or Flexible |
| **Cleanliness** | 30% | Very Neat, Moderate, or Messy |
| **Dietary Habit** | 20% | Veg, Non-Veg, or Vegan |
| **Smoking Habit** | 20% | No, Yes, or Occasionally |
| **Total Match Score** | **100%** | Displayed as a color-coded percentage badge on each card |

When you update your preferences in **My Profile**, the Browse feed immediately recalculates and reflects the new match percentages in real time.

---

## 👨‍💻 Author

- **Bhavya Bansal**
- **Degree:** B.Tech in Computer Science & Artificial Intelligence (CS-AI)
- **Repository:** [bhavyabansal2811/NestMate](https://github.com/bhavyabansal2811/NestMate)

# 🏠 NestMate — Smart Roommate Matching App

A clean, user-friendly mobile application built with **React Native (Expo)** designed to help students and young professionals find compatible roommates based on lifestyle habits, budget, and location preferences.

---

## 📌 Project Overview

- **Project Title:** NestMate – Smart Roommate Matching Application
- **Category:** Minor Project (B.Tech CS-AI)
- **Tech Stack:** React Native, Expo, React Navigation, AsyncStorage
- **Target Audience:** College students and young flat-seekers

---

## ✨ Key Features (8 Features)

| # | Feature | Description |
|---|---|---|
| 1️⃣ | **User Authentication** | Simple on-device account registration and login session. |
| 2️⃣ | **Profile Creation** | Add personal info such as name, age, college/workplace, budget, and avatar. |
| 3️⃣ | **Preference Form** | Select lifestyle habits (sleep schedule, cleanliness, diet, smoking habits, etc.). |
| 4️⃣ | **Browse Roommates** | Scroll through profiles displayed as clean, readable cards. |
| 5️⃣ | **Smart Search & Filters** | Filter prospective roommates by budget range, college, and gender. |
| 6️⃣ | **Compatibility Scoring** | Calculates and displays a match percentage based on shared preferences. |
| 7️⃣ | **Shortlist / Bookmarks** | Save favorite profiles for quick access later using persistent storage. |
| 8️⃣ | **Edit Profile** | Update your own personal details, budget, and preferences anytime. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation:** React Navigation (Stack & Tab navigation)
- **Data Persistence:** `@react-native-async-storage/async-storage` (Local storage for offline-first simplicity)
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
- **Matching Logic:** JavaScript score-weighting algorithm comparing preference attributes

---

## 📱 Application Flow

```text
[ Welcome / Login ] ──▶ [ Profile Setup & Preferences ]
                                   │
                                   ▼
                       [ Main App (Bottom Tabs) ]
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
[ 🔍 Browse / Feed ]      [ ⭐ Shortlisted ]          [ 👤 My Profile ]
      │                                                         │
      └─▶ [ Filter Modal ]                                      └─▶ [ Edit Profile ]
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine or physical device:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- **Expo Go** app installed on your Android/iOS device

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/nestmate-app.git
   cd nestmate-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run the App:**
   - Scan the QR code in the terminal using the **Expo Go** app on your phone.
   - Or press `a` to run on an Android emulator / `i` for iOS simulator.

---

## 📁 Project Directory Structure

```text
nestmate-app/
├── assets/             # Images, icons, and placeholder avatars
├── src/
│   ├── components/     # Reusable UI components (RoommateCard, CustomButton)
│   ├── data/           # Mock data for demonstration profiles
│   ├── navigation/     # App navigators (AuthNavigator, TabNavigator)
│   ├── screens/        # Screen views
│   │   ├── LoginScreen.js
│   │   ├── ProfileSetupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── FilterScreen.js
│   │   ├── ShortlistScreen.js
│   │   └── EditProfileScreen.js
│   └── utils/          # Compatibility scoring helper functions & storage keys
├── App.js              # Entry point of the application
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

---

## 💡 How Compatibility Matching Works

The compatibility system uses a rule-based scoring mechanism:
1. Compares user habits with each profile (e.g., Sleep Schedule: Early Bird vs. Night Owl).
2. Assigns weighted points to exact matches across common factors:
   - Sleep Schedule Match
   - Cleanliness Level Match
   - Dietary Preference Match
   - Smoking Habit Match
3. Normalizes the score into a clear percentage (`0% - 100%`) shown directly on each roommate card.

---

## 👨‍💻 Author
- **Bhavya Bansal**
- **Student:** B.Tech Computer Science & Artificial Intelligence (CS-AI)

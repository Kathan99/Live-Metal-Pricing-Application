# Live Metal Prices Application

The app displays live prices for Gold, Silver, Platinum, and Palladium, which are updated dynamically every 30 seconds. It features a home screen with summary tiles and a details screen with more in-depth information for each metal.

---

## 📸 Screenshots

### Home Screen
*Displays a list of metals with their current prices and a synchronized countdown timer for the next update.*

![Home Screen Screenshot](./screenshots/HomePage.png) 

### Details Screen
*Shows detailed information for a selected metal, including price change indicators and a synchronized 30-second update timer.*

![Details Screen Screenshot](./screenshots/DetailsPage.png)

---

## ✨ Features

- **Live Price Tracking**: Fetches and displays prices for Gold, Silver, Platinum, and Palladium.
- **Dynamic Updates**: Prices on both the home and details screens update automatically every 30 seconds.
- **Synchronized Timers**: A global countdown timer is synchronized across all components, showing users exactly when the next price update will occur.
- **Individual Loaders**: Each tile on the home screen handles its own initial loading state independently.
- **Detailed View**: A dedicated screen shows comprehensive details, including:
    - Previous Close, Open, Day High, and Day Low.
    - Dynamically calculated price change and percentage.
    - Visual indicators (▲/▼) for positive or negative price changes.
- **Error Handling**: Gracefully handles API errors on a per-component basis.
---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API**: Mock API service with simulated live data updates.

---

## 🚀 Getting Started


### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation & Execution

1.  **Clone the repository:**
    ```bash
    git clone [hhttps://github.com/Kathan99/Live-Metal-Pricing-Application.git](https://github.com/Kathan99/Live-Metal-Pricing-Application.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd samplify-money-assignment
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the application:**
    ```bash
    npx expo start
    ```

5.  **Open the app:**
    - Scan the QR code with the Expo Go app on your iOS or Android phone.
    - Or, press `a` to run on an Android Emulator or `i` to run on an iOS Simulator.

# 🛍️ React Native Shopping App

A simple yet functional React Native mobile application featuring:

- Product List with pagination
- Cart and Wishlist management (Redux)
- Profile screen with avatar upload
- TypeScript with strict mode

---

## ✨ Features

- **Product List Screen**: Paginated fetch from API, with loading and error states.
- **Cart Screen**: View, remove items, and display total.
- **Wishlist Screen**: Toggle wishlist state from product list.
- **Profile Screen**:
  - Edit name and email (local state).
  - Upload avatar via **camera** or **gallery**.
  - Show **upload progress** using simulated async logic.
  - Display avatar once "uploaded".

---

## 🧩 Tech Stack & Libraries

| Library / Framework             | Reason for Choice                               |
| ------------------------------- | ----------------------------------------------- |
| **React Native**                | Cross-platform mobile development.              |
| **TypeScript (strict)**         | Type safety and better tooling.                 |
| **Redux Toolkit**               | Manage cart and wishlist state cleanly.         |
| **React Navigation**            | Smooth screen navigation.                       |
| **Axios**                       | Consistent, promise-based HTTP client.          |
| **react-native-image-picker**   | Enables image selection from gallery or camera. |
| **ActivityIndicator (RN core)** | For upload loading feedback.                    |

---

## 📁 Folder Structure

```
src/
├── api/                     # Axios-based API service files
├── assets/                  # Static assets
├── components/              # Reusable UI components (AppHeader, AppInput, AppText)
├── redux/                   # Redux store and slices (cart, wishlist)
├── screens/
│   ├── ProductList/
│   ├── Cart/
│   ├── Wishlist/
│   └── Profile/             # ProfileScreen with avatar upload
├── types/                   # Shared TypeScript types/interfaces
└── App.tsx                  # Entry point
```

---

## ⚖️ Trade-offs & Shortcuts

- Used **local state** instead of backend for Profile data (name, email, avatar).
- **Simulated upload progress** to demonstrate UX feedback — no actual server upload.
- Choose **react-native-image-picker** for its ease of use, skipping native camera/gallery modules setup.
- Basic UI and error handling, focusing on core logic due to time constraints.

---

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run on device:

   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

---


## 🎥 Demo Video

https://github.com/user-attachments/assets/41d1cac8-d340-47bc-9b0f-9a4accd67b82

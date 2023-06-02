// Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB6b_wtOzAEw-Fr3BUWkN5Z_k3zjemF9BU",
//   authDomain: "first-react-native-proje-98226.firebaseapp.com",
//   projectId: "first-react-native-proje-98226",
//   storageBucket: "first-react-native-proje-98226.appspot.com",
//   messagingSenderId: "165190012386",
//   appId: "1:165190012386:web:10bc30ed688f80dbe5bdbb",
//   measurementId: "G-GDJVP33FB6",
// };

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6b_wtOzAEw-Fr3BUWkN5Z_k3zjemF9BU",
  authDomain: "first-react-native-proje-98226.firebaseapp.com",
  databaseURL:
    "https://first-react-native-proje-98226-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-react-native-proje-98226",
  storageBucket: "first-react-native-proje-98226.appspot.com",
  messagingSenderId: "165190012386",
  appId: "1:165190012386:web:764587bead9c6adde5bdbb",
  measurementId: "G-QWSRL324SZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Для роботи із firebase обовʼязково треба ініціалізувати проект
// import { initializeApp } from 'firebase/app';
// // Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";
// // // Функція для підключення бази даних у проект
// import { getFirestore } from "firebase/firestore";
// // import { getDatabase } from "firebase/database";

// // // Функція для підключення сховища файлів в проект
// import { getStorage } from "firebase/storage";

// const app = initializeApp(firebaseConfig);
// // console.log(app);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// // export const db = getDatabase(app);
// export const storage = getStorage(app);

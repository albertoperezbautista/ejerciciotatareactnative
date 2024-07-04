import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBCLxuzICIe4OkInUdnuzUEJr7ZVLr5K1U",
  authDomain: "frenec-pruebas.firebaseapp.com",
  projectId: "frenec-pruebas",
  storageBucket: "frenec-pruebas.appspot.com",
  messagingSenderId: "795465086012",
  appId: "1:795465086012:web:61d629b4f685f930b33f39",
  measurementId: "G-R1B6W24B2L",
};

export const firebaseApp = initializeApp(firebaseConfig);

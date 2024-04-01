// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// import { initializeApp } from '@react-native-firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO1_nj3_SMSnGbqgkixX_WmejslWRlIT0",
  authDomain: "capstone-11656.firebaseapp.com",
  databaseURL: "https://capstone-11656-default-rtdb.firebaseio.com",
  projectId: "capstone-11656",
  storageBucket: "capstone-11656.appspot.com",
  messagingSenderId: "193852145247",
  appId: "1:193852145247:web:d3a697df48c86669e625ea",
  measurementId: "G-WBNF643JM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

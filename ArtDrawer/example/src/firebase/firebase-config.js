/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD4DxKejNB8_vPorMLSFKIIqZoyKjrgb9Q",
  authDomain: "art-drawer.firebaseapp.com",
  databaseURL: 'https://art-drawer.firebaseio.com',
  projectId: "art-drawer",
  storageBucket: "art-drawer.appspot.com",
  messagingSenderId: "141711685631",
  appId: "1:141711685631:web:a96b220cea066b090619ca",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

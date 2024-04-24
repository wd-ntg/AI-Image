// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzb-tJys_tksR2CNCeDgLCPYIdF-4oigk",
  authDomain: "ai-img-27b16.firebaseapp.com",
  projectId: "ai-img-27b16",
  storageBucket: "ai-img-27b16.appspot.com",
  messagingSenderId: "520991651103",
  appId: "1:520991651103:web:9def0842b4f122a088ac2a",
  measurementId: "G-00J909C8WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
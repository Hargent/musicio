// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO0j6PMYT1S-afDGcWI_HAfQhQBnedWV4",
  authDomain: "musicio-f8f13.firebaseapp.com",
  projectId: "musicio-f8f13",
  storageBucket: "musicio-f8f13.appspot.com",
  messagingSenderId: "42122072344",
  appId: "1:42122072344:web:5cf936bb51a4183e490e6d",
  measurementId: "G-CC8W00HEYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const analytics = getAnalytics(app);

export { app, auth };

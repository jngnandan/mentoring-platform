// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoY2fik2B0taRXfxOQys8s0RdZt1LQutM",
  authDomain: "mentor-platform-b5786.firebaseapp.com",
  projectId: "mentor-platform-b5786",
  storageBucket: "mentor-platform-b5786.appspot.com",
  messagingSenderId: "910214703887",
  appId: "1:910214703887:web:314fe4329fa49858c4ac7a",
  measurementId: "G-NRTRCXHBSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Twitter Auth Provider
const twitterProvider = new TwitterAuthProvider();

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User Info: ", user);
    // Optionally, handle additional sign-in info and redirect
  } catch (error) {
    console.error("Error signing in with Google:", error);
    // Handle errors
  }
};

// Sign in with Twitter
const signInWithTwitter = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const user = result.user;
    console.log("User Info: ", user);
    // Optionally, handle additional sign-in info and redirect
  } catch (error) {
    console.error("Error signing in with Twitter:", error);
    // Handle errors
  }
};

export { auth, firestore, signInWithGoogle, signInWithTwitter };

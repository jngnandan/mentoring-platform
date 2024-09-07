import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoY2fik2B0taRXfxOQys8s0RdZt1LQutM",
  authDomain: "mentor-platform-b5786.firebaseapp.com",
  projectId: "mentor-platform-b5786",
  storageBucket: "mentor-platform-b5786.appspot.com",
  messagingSenderId: "910214703887",
  appId: "1:910214703887:web:314fe4329fa49858c4ac7a",
  measurementId: "G-NRTRCXHBSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

// Initialize Supabase client
const SUPABASE_URL = "https://lfibhgotnojhtgzuusgu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWJoZ290bm9qaHRnenV1c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzY1MTUsImV4cCI6MjA0MTExMjUxNX0.1LIoh-F9oQPbSHyX14A3eKx1a8sNoqyrRQDyn_X7u24"; // Replace with your Supabase anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Twitter Auth Provider
const twitterProvider = new TwitterAuthProvider();

// Function to save user info to Supabase
const saveUserToSupabase = async (user) => {
  const { email, displayName, uid } = user;
  const { error } = await supabase
    .from("users")
    .insert([
      {
        email,
        display_name: displayName,
        firebase_uid: uid,
        created_at: new Date(),
      },
    ]);

  if (error) {
    console.error("Error saving user to Supabase:", error);
  }
};

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save user info to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      firebase_uid: user.uid,
      created_at: new Date(),
    });

    // Save user info to Supabase
    await saveUserToSupabase(user);

    console.log("User signed in with Google: ", user);
    // Return user or any necessary data for further processing
    return user; // Return user for further use (e.g., redirecting)
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw new Error("Google sign-in failed. Please try again."); // Throw error to handle in the UI
  }
};

// Sign in with Twitter
const signInWithTwitter = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const user = result.user;

    // Save user info to Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      firebase_uid: user.uid,
      created_at: new Date(),
    });

    // Save user info to Supabase
    await saveUserToSupabase(user);

    console.log("User signed in with Twitter: ", user);
    // Return user or any necessary data for further processing
    return user; // Return user for further use (e.g., redirecting)
  } catch (error) {
    console.error("Error signing in with Twitter:", error);
    throw new Error("Twitter sign-in failed. Please try again."); // Throw error to handle in the UI
  }
};

// Export necessary modules
export { auth, firestore, signInWithGoogle, signInWithTwitter };

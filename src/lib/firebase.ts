import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config/firebaseConfig";

// If the config hasn't been filled in yet, the site still works
// (falls back to default packages and no blocked dates).
export const firebaseReady = !firebaseConfig.apiKey.startsWith("PASTE");

const app = firebaseReady ? initializeApp(firebaseConfig) : null;

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

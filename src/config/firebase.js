import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";

// Firebase Configuration from environment variables
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "ISI_API_KEY_DISINI",
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ISI_AUTH_DOMAIN_DISINI",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ISI_PROJECT_ID_DISINI",
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ISI_STORAGE_BUCKET_DISINI",
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "ISI_SENDER_ID",
	appId: import.meta.env.VITE_FIREBASE_APP_ID || "ISI_APP_ID",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = import.meta.env.VITE_APP_ID || "default-app-id";

// Helper Functions
export const getCollectionRef = (collName) => {
	if (import.meta.env.VITE_APP_ID) {
		return collection(db, "artifacts", appId, "public", "data", collName);
	}
	return collection(db, collName);
};

export const getDocRef = (collName, docId) => {
	if (import.meta.env.VITE_APP_ID) {
		return doc(db, "artifacts", appId, "public", "data", collName, docId);
	}
	return doc(db, collName, docId);
};

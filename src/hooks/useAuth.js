import { onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const initAuth = async () => {
			try {
				if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
					await signInWithCustomToken(auth, __initial_auth_token);
				} else {
					await signInAnonymously(auth);
				}
			} catch (e) {
				console.error("Auth Error", e);
			}
		};

		initAuth();
		const unsubscribe = onAuthStateChanged(auth, setUser);
		return () => unsubscribe();
	}, []);

	return { user };
};

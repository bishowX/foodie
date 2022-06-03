import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../../lib/firebase";
import { mapUser } from "../../utils/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUserAndGetCustomToken = async (email, password, fullName) => {
		return fetch("http://localhost:3000/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, fullName }),
		}).then(async (response) => {
			const result = await response.json();
			if (!response.ok) throw Error(result.message || result.code);
			return result.customToken;
		});
	};

	const signupWithEmailAndPassword = async (email, password, fullName = "") => {
		const customToken = await createUserAndGetCustomToken(email, password, fullName);
		return signInWithCustomToken(auth, customToken);
	};

	// signInWithEmailAndPasssword with capital "I" is from firebase and signinWithEmailAndPassword with small "i" is a custom function
	const signinWithEmailAndPassword = async (email, password) => signInWithEmailAndPassword(auth, email, password);

	const logout = async () => {
		await signOut(auth);
		setUser(null);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) setUser(mapUser(user));
			else setUser(null);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const value = { user, loading, signupWithEmailAndPassword, signinWithEmailAndPassword, logout };

	return <AuthContext.Provider value={value}>{loading ? null : children}</AuthContext.Provider>;
};

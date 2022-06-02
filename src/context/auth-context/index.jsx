import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../../lib/firebase";
import { mapUser } from "../../utils/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signupWithEmailAndPassword = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

	// signInWithEmailAndPasssword with capital "I" is from firebase and signinWithEmailAndPassword with small "i" is a custom function
	const signinWithEmailAndPassword = async (email, password) => signInWithEmailAndPassword(auth, email, password);

	const logout = async () => {
		setUser(null);
		await signOut(auth);
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

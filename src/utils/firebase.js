export const mapUser = (user) => {
	return {
		uid: user.uid,
		displayName: user.displayName,
		email: user.email,
	};
};

export const mapFirebaseErrorCodeToHtppStatusCode = (firebaseErrorCode) => {
	switch (firebaseErrorCode) {
		case "auth/email-already-exists":
			return 409;
		case "auth/invalid-password":
			return 401;
		default:
			return 404;
	}
};

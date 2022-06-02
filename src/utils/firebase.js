export const mapUser = (user) => {
	return {
		uid: user.uid,
		displayName: user.displayName,
		email: user.email,
	};
};

import { useRouter } from "next/router";

import { useAuth } from "../../context/auth-context";

// this component returns a function that redirects to "/" if a user is authenticated

const WithoutAuth = (WrappedComponent) => {
	return (props) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		if (loading) return null;

		if (user) {
			router.push("/");
			return null;
		}

		return <WrappedComponent {...props} />;
	};
};

export default WithoutAuth;

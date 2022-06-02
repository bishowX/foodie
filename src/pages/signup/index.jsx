import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import WithoutAuth from "../../components/without-auth";
import { useAuth } from "../../context/auth-context";

const Signup = () => {
	const { signupWithEmailAndPassword } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSignup = async (event) => {
		event.preventDefault();
		setLoading(true);

		signupWithEmailAndPassword(email, password)
			.then(() => {
				setLoading(false);
				router.push("/");
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	};

	return (
		<div>
			<h3>Signup</h3>
			<form onSubmit={handleSignup}>
				<label style={{ display: "block" }} htmlFor="email">
					Email
				</label>
				<input disabled={loading} value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" />
				<label style={{ display: "block" }} htmlFor="password">
					Password
				</label>
				<input disabled={loading} value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" />
				<button disabled={loading} type="submit">
					Sign up
				</button>
			</form>

			<Link href="/login">
				<a>Login here</a>
			</Link>
			{loading && <h1>Loading</h1>}
			{error && <h1>Error: {error}</h1>}
		</div>
	);
};

export default WithoutAuth(Signup);

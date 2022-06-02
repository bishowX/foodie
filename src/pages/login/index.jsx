import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../context/auth-context";
import WithoutAuth from "../../components/without-auth";

const Login = () => {
	const { signinWithEmailAndPassword } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	const handleLogin = (event) => {
		event.preventDefault();
		setLoading(true);

		signinWithEmailAndPassword(email, password)
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
			<form onSubmit={handleLogin}>
				<h3>Login</h3>
				<label style={{ display: "block" }} htmlFor="email">
					Email
				</label>
				<input disabled={loading} value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" />
				<label style={{ display: "block" }} htmlFor="password">
					Password
				</label>
				<input disabled={loading} value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" />
				<button disabled={loading} type="submit">
					Login
				</button>
			</form>

			<Link href="/signup">
				<a>Signup here</a>
			</Link>
			{loading && <h1>Loading</h1>}
			{error && <h1>Error: {error}</h1>}
		</div>
	);
};

export default WithoutAuth(Login);

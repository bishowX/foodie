import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../context/auth-context";

const Home = () => {
	const { user, logout } = useAuth();

	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<div>
			<h1>Hello world</h1>
			{user ? (
				<>
					<h1>{user.email}</h1>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<Link href="/login">
					<a>Login</a>
				</Link>
			)}
		</div>
	);
};

export default Home;

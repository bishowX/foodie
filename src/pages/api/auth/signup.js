import { auth } from "../../../lib/firebase-admin";
import { mapFirebaseErrorCodeToHtppStatusCode } from "../../../utils/firebase";

const createUser = (req, res) => {
	if (req.method === "POST") {
		console.log("body ", req.body);
		const { fullName, email, password } = req.body;

		if (fullName.length < 4) {
			res.status(401).json({ message: "Full name must be at least 4 characters long", code: "fullname-length-insufficient" });
		}

		auth.createUser({
			email,
			emailVerified: false,
			password,
			displayName: fullName,
			disabled: false,
		})
			.then((userRecord) => {
				auth.createCustomToken(userRecord.uid)
					.then((customToken) => {
						res.status(200).send({ customToken });
					})
					.catch((error) => {
						res.send(error);
					});
			})
			.catch((error) => {
				res.status(mapFirebaseErrorCodeToHtppStatusCode(error.code)).send(error);
			});
	} else {
		res.status(405).json({ message: "This endpoint only supports  POST method" });
	}
};

export default createUser;

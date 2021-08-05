import jwt from "jsonwebtoken"
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'

const Handler = async (req, res) => {
	const { method } = req

	await dbConnect()
	switch (method) {
		case "GET":
			try {

				let id = decodeUserToken(req.headers.authorization).id
				let user = await User.findById(id)
				res.status(200).send(user);
			} catch (error) {
				console.log(error)
				res.status(400).send(error);
			}
			break;
		case 'POST':
			try {
				const user = await User.findOne({ mail: req.body.mail, password: req.body.password })
				user.token = setUserToken(user._id)
				res.status(200).send(user);
			} catch (error) {
				res.status(400).send(error);
			}
			break;
	}
}

export const setUserToken = (id) => {
	return jwt.sign({ id: id }, "dupa", { expiresIn: 1000 * 60 * 2 })
}

export const decodeUserToken = (token) => {
	return jwt.verify(token, "dupa")
}

export default Handler
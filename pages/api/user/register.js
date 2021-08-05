import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'

const Handler = async (req, res) => {
	const { method } = req

	await dbConnect()
	switch (method) {
		case 'POST':
			try {

				const user = await User.findOne({ mail: req.body.mail })

				if (user !== null) res.status(400).send("mail znajduje się w bazie");
				else {
					if (validateData(req.body)) {
						const user = await User.create({ mail: req.body.mail, name: req.body.name, password: req.body.password })
						res.status(200).send(user);
					}
					else{
						res.status(400).send({error:"validation"});
					}
				}
			} catch (error) {
				console.log(error)
				res.status(400).send(error);
			}
			break;
	}
}

const validateData = (data) => {
	if (data.mail === "" || data.name === "" || data.password === "") {
		return false
	}
	else {
		return true
	}
}

export default Handler
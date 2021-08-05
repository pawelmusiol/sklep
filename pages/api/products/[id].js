import Product from "../../../models/product"
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
	const { method } = req
	const { id } = req.query

	switch (method) {
		case 'GET':
			await dbConnect()
			const product = await Product.aggregate([
				{
					$match: { code: id }
				},
				{
					"$project": {
						"name": "$name",
						"bandId": {
							"$toObjectId": "$bandId"
						},
						"code": "$code",
						"img": "$img",
						"price": "$price",
						"promoPrice": "$promoPrice",
						"quantity": "$quantity",
						"subgenre": "$subgenre",
						"releaseDate": "$releaseDate",
						"genre": "$genre",
						"category": "$category",
						"format": "$format"
					}
				},
				{
					$lookup: {
						from: "bands",
						let: { "bandId": "$bandId" },
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ["$_id", "$$bandId"]
									}
								}
							},
							{ $project: { "name": "$name" } }
						],
						as: "band",
					}
				}
			])
			res.status(200).send(product[0])
			break;
	}
}
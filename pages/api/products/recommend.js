import Product from "../../../models/product"
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
	const {method} = req

	switch (method) {
		case "GET":
			const {query} = req
			await dbConnect()
			const products = await getProducts(query)
			res.send(products)
			break;
	}
}

const getProducts = async (query) => {
	let queryData = {
		genre: query.genre
	}

	const products = await Product.aggregate([
		{
			$match:queryData,
		},
		{
			$limit: 4
		},
		{
			"$project": {
				"name": "$name",
				"img": "$img",
				"code": "$code",
				"price": { $toDecimal: "$price" },
				"promoPrice": { $toDecimal: "$promoPrice" },
				"quantity": { $toInt: "$quantity" }
			}
		}
	])
	return products
}
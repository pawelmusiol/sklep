import { decodeCartToken } from ".";
import { decodeUserToken } from "../user/login"
import Cart from "../../../models/cart";
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
	const { method, headers, body } = req
	let token = req.url.split('/')[3]
	let result = {}
	await dbConnect()
	switch (method) {
		case 'PUT':
			let dbResult = await CartConfirm(token, body)
			if (dbResult.ok === 1) {
				res.status(200).send({ message: "success"})
			}
			else{
				res.status(403).send({ message: "error"})
			}
			break;
	}
}

const CartConfirm = async (token, data) => {
	let id = await decodeCartToken(token).id
	let products = setProductsData(data.Products)
	console.log(id)
	return Cart.updateOne({_id: id}, {
		products: products,
		payment: {
			Type: data.Payment.Type,
			Price: data.Payment.Price,
			Address: data.Payment.Address
		},
		delivery: data.Delivery,
		userId: decodeUserToken(data.UserToken).id
	})
}

const setProductsData = (products) => {
	let readyProducts = []
	products.forEach(product => {
		readyProducts.push({
			code: product.code,
			quantity: product.quantity,
		})
	})
	return readyProducts
}
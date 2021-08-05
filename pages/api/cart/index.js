import Cart from "../../../models/cart"
import Product from "../../../models/product"
import dbConnect from '../../../utils/dbConnect'
import jwt from "jsonwebtoken"

const createCart = async (userId) => {
	let date = new Date()
	let result = await Cart.create({
		userId: userId || null,
		products: [],
		createDate: date,
		updateDate: date,
		status: 0,
		payment: {}

	})
	return setCartToken(result._id)
}

export default async function handler(req, res) {
	const { method, headers, body } = req
	let result = {}
	await dbConnect()
	switch (method) {
		case 'GET':
			let resToken = ""
			if (headers.carttoken) {
				let id = decodeCartToken(headers.carttoken).id
				result = await Cart.findById(id)
				let products = {}
				if (result) {
					products = await getProductsFromCart(result.products)
					resToken = headers.carttoken
				}
				else {
					resToken = await createCart(body.id)
				}
				res.send({ token: resToken, products: products });
			}
			else {
				resToken = await createCart(body.id)
				res.send({ token: resToken })
			}
			break;
		case 'POST':
			result = await addToCart(body, headers.carttoken)
			res.send(result);
			break;
		case 'PUT':
			res.send({message: "dupa"})
			break;
		case 'DELETE':
			result = await deleteProductFromCart(headers.carttoken, headers.product)

			res.send(result)
			break;
	}
}

const deleteProductFromCart = async (token, productCode) => {
	let id = decodeCartToken(token).id
	let updateResult = await Cart.updateOne(
		{ _id: id },
		{
			$pull: { products: { code: productCode } }
		})

	let result = await Cart.findById(id)
	console.log(result)
	return result
}

const getProductsFromCart = async (products) => {
	let queryData = setProductsData(products)
	let productsDb = await Product.aggregate([
		{
			$match: queryData
		},
		{
			"$project": {
				"bandId": {
					"$toObjectId": "$bandId"
				},
				"name": "$name",
				"img": "$img",
				"code": "$code",
				"price": { $toDecimal: "$price" },
				"promoPrice": { $toDecimal: "$promoPrice" },
				"quantity": { $toInt: "$quantity" },
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
		},
	])
	return addQuantity(productsDb, products)
}

const addQuantity = (productsDb, productsClient) => {
	for (let i = 0; i < productsDb; i++) {
		productsDb[i].userQuantity = 0
	}

	productsDb.forEach(productDb => {
		productsClient.forEach(product => {
			if (productDb.code === product.code) {
				if (productDb.quantity >= product.quantity) productDb.quantity = product.quantity
			}
		})
	})

	return productsDb
}

const setProductsData = (products) => {
	let productCodes = { $or: [{ code: 0 }] }
	products.forEach((product) => {
		if (product.code) productCodes.$or.push({ code: product.code })
	})
	return productCodes
}

const addToCart = async (data, token) => {
	let id = decodeCartToken(token).id
	console.log(id)
	let cartExist = await Cart.findById(id)
	let result
	console.log(cartExist)
	let date = new Date()
	let condition = { _id: id }
	if (cartExist.id) {
		result = await Cart.bulkWrite([
			{
				updateOne: {
					filter: condition,
					update: {
						$pull: {
							products: { code: data.product.code }
						}
					}
				}
			},
			{
				updateOne: {
					filter: condition,
					update: {
						$addToSet: {
							products: {
								code: data.product.code,
								quantity: data.product.quantity
							}
						}
					},
				}
			}
		])
	}

	else {
		result = await Cart.create({
			userId: data.id || null,
			products: [{
				code: data.product.code,
				quantity: data.product.quantity
			}],
			createDate: date.toISOString(),
			updateDate: date.toISOString(),
			status: 0,
			payment: {}
		})
	}
	return result
}

export const setCartToken = (id) => {
	return jwt.sign({ id: id }, "dupa")
}

export const decodeCartToken = (token) => {
	console.log(token)
	return jwt.verify(token, "dupa")
}
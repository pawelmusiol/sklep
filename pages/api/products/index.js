import Product from "../../../models/product"
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
	const { method, query } = req
	switch (method) {
		case 'GET':
			await dbConnect()

			const [products, count] = await getData(query)
			res.status(200).send({products: products, count: count})
			break;
		case 'POST':
			await dbConnect()

			let product = req.body.product
			break;
	}
}

const getData = async (query) => {
	let limitation = serializeLimitation(query)
	let matchData = serializeMatch(query)
	const count = await Product.find(matchData).count()
	console.log(count)
	const products = await Product.aggregate([
		{
			$match: {
				...matchData
			},
		},
			limitation.limitData,
			limitation.pageData,

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
				"quantity": { $toInt: "$quantity" }
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
					{ $project: { "name": "$name", "country": "$country" } }
				],
				as: "band",
			}
		},
		{
			$match: {
				...getCountry(query)
			}
		}

	])
	return [products, count]
}

const serializeLimitation = (query) => {
	let queryData = {}
	let limitData = getLimit(query)
	let pageData = getPage(query, limitData.$limit)
	queryData = {limitData, pageData}

	return queryData
}

const getLimit = (query) => {

	let queryData = {}
	if (!query.limit) {
		if (query.page) queryData.$limit = query.page * 20
		else queryData.$limit = 20
	}
	else if(query.limit > 40) {
		if (query.page) queryData.$limit = query.page * 40
		else queryData.$limit = 40
	}
	else if (query.limit) {
		if (query.page) queryData.$limit = query.page * query.limit
		else queryData.$limit = parseInt(query.limit)
	}
	return queryData
}

const getPage = (query) => {
	let queryData = {}
	if (!query.page) queryData.$skip = 0
	else if(query.page) queryData.$skip = query.limit * (query.page - 1)
	return queryData
}


const serializeMatch = (query) => {
	let queryData = {
	}
	let searchData = getSearch(query)
	let categoryData = getCategory(query)
	let genreData = getGenre(query)
	let releaseDate = getDate(query.fdate, query.tdate)
	let styleData = getStyle(query)
	queryData = { ...categoryData, ...genreData, ...releaseDate, ...styleData, ...searchData }


	return queryData
}

const getSearch = (query) => {
	let queryData = {}

	if (query.search === "" || query.search === undefined || query.search === null) {}
	else{
		queryData.$text = { $search: query.search}
	}
	return queryData
}

const getGenre = (query) => {
	let genres = ["pop", "rock", "metal"]
	let queryData = {}

	if (genres.includes(query.genre)) {
		queryData.genre = query.genre
	}
	return queryData
}

const getCategory = (query) => {
	let categories = ['gift', 'vinyl', 'CD']
	let queryData = {}
	if (query.category === '') { }
	else if (query.category) {
		let categoryArgs = query.category.split(',')
		let queryCategories = []
		for (let arg of categoryArgs) {
			if (arg === 'promo') queryData.promoPrice = { $ne: 0 }
			if (arg === 'limited') queryData.limited = true
			if (categories.includes(arg)) {
				queryCategories.push(arg)
			}
		}
		if (queryCategories.length) {
			queryData.category = { $all: queryCategories }
		}
	}

	return queryData
}

const getDate = (fdate, tdate) => {
	let queryData = {}

	if (fdate && tdate) queryData.releaseDate = {
		$gte: new Date(parseInt(fdate)),
		$lte: new Date(parseInt(tdate))

	}
	else if (fdate) queryData.releaseDate = {
		$gte: new Date(parseInt(fdate))
	}
	else if (tdate) queryData.releaseDate = {
		$lte: new Date(parseInt(tdate))
	}
	return queryData
}

const getCountry = (query) => {

	let queryData = {}
	if (query.country) {
		queryData["band.country"] = query.country
	}
	return queryData
}

const getStyle = (query) => {
	let styles = ["hard rock", "heavy metal","american pop", "new wave", "black metal", "progresive rock"]
	let queryData = {}
	if (styles.includes(query.style)) {

		queryData.subgenre = query.style
	}

	return queryData
}
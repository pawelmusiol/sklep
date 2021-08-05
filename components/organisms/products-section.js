import { ProductWidget, Section, Pagination } from "../molecules"
import { CartContext } from "../providers"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { usePre } from "../helpers"
import { useRouter } from "next/router"

const useProducts = (url) => {
	const [Ready, setReady] = useState(false)
	const [Products, setProducts] = useState([])
	const [Count, setCount] = useState([])
	const pre = usePre()
	const router = useRouter()

	let apiUrl = pre + "api" + setPath(router)

	if (url) {
		apiUrl = pre + "api" + url
	}

	useEffect(() => {
		axios.get(apiUrl).then((response) => {

			setPrice(response.data.products)
			setProducts(response.data.products)
			setCount(response.data.count)
			setReady(true)
		})
	}, [router])
	return [Products, Count, Ready]
}

const setPrice = (products) => {
	return products.forEach((product) => {
		product.price = product.price.$numberDecimal
		product.promoPrice = product.promoPrice.$numberDecimal

	})

}

const setPath = (router) => {
	if (router.asPath === "/") {
		return "/products"
	}
	if (router.asPath !== "/") {
		return router.asPath
	}

}

const ProductSection = ({ title, url, pagination }) => {
	let MainTitle = title || "Produkty"
	const Cart = useContext(CartContext)
	const [products, count, ready] = useProducts(url)
	let ProductsDOM = ""
	if (products) {
		ProductsDOM = products.map(product => {
			let ToCart = {
				img: product.img[0],
				code: product.code,
				name: product.name,
				band: product.band[0].name,
				price: product.price,
				promoPrice: product.promoPrice,
				storeQuantity: product.quantity,
			}
			return (
				<ProductWidget
					band={product.band[0].name}
					name={product.name}
					price={product.price}
					src={product.img[0]}
					code={product.code}
					promoPrice={product.promoPrice}
					addToCart={() => Cart.addProduct({ ...ToCart, quantity: 1 })}
				/>
			)
		})
	}
	return (
		<Section title={MainTitle} ready={ready}>
			<>
				<div className="products">
					{ProductsDOM}
				</div>
				{pagination &&
					<Pagination itemCount={count} />
				}
			</>
		</Section>
	)
}

export default ProductSection
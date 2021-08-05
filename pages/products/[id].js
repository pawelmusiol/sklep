import {
	ProductGallery as Gallery,
	ProductParameters as Parameters,
	ProductCart as Cart,
	LeftMenu as Menu
} from "../../components/organisms"

import { GenrePaths } from "../../components/organisms/filter-menu"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";

const useProduct = () => {
	const router = useRouter()
	const [Product, setProduct] = useState(undefined)
	useEffect(() => {
		if (router.isReady) {
			axios.get("../api" + router.asPath).then((response) => {
				setProduct(response.data)
			})
		}
	}, [router.isReady])
	return setData(Product)
}

const setData = (Product) => {
	let ImageSection, DescSection, CartSection, ToCart
	if (Product !== undefined) {
		ImageSection = {
			img: Product.img,
			code: Product.code
		}
		DescSection = {
			name: Product.name,
			band: Product.band[0].name,
			code: Product.code,
			genre: Product.genre,
			subgenre: Product.subgenre,
			releaseDate: Product.releaseDate,
			format: Product.format,
		}
		CartSection = {
			code: Product.code,
			quantity: Product.quantity.$numberDecimal,
			price: Product.price.$numberDecimal,
			promoPrice: Product.promoPrice.$numberDecimal,
		}
		ToCart = {
			img: Product.img[0],
			code: Product.code,
			name: Product.name,
			band: Product.band[0].name,
			price: Product.price.$numberDecimal,
			promoPrice: Product.promoPrice.$numberDecimal,
			storeQuantity: Product.quantity.$numberDecimal,
		}
	}

	return [ImageSection, DescSection, CartSection, ToCart]
}

const MenuValues = [{
	path: "/products",
	text: "Produkty",
	type: "genre",
	children: GenrePaths
},

]

const Product = () => {
	const [ImageSection, DescSection, CartSection, ToCart] = useProduct()


	return (
		<div className="content product-page">
			{ ImageSection &&
				<>
					<Menu menuValues={MenuValues} />
					<Gallery images={ImageSection.img} code={ImageSection.code} />
					<Parameters Product={DescSection} />
					<Cart Price={CartSection} Product={ToCart} />
				</>
			}
		</div>
	)
}

export default Product
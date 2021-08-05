import Image from "next/image"
import { ALink } from "../atoms"

const getProductsList = (Products) => {
	return Products.map((Product, key) => {
		return setProduct(Product, key)
	})
}

const setProduct = (Product, key) => {
	return (
		<div className="menu-cart-row" key={key}>
			<div className="menu-cart-image">
				<Image layout="fill" src={"/products/" + Product.code + "/" + Product.img} />
			</div>
			<div className="menu-cart-info">
				<p>{Product.name}</p>
				<p className="band">{Product.band}</p>
				<div className="info-inner">
					<p>{Product.quantity} szt.</p>
					<p>{getPrice(Product)} zł</p>
				</div>
			</div>
		</div>
	)
}

const getPrice = (Product) => {
	let returnPrice = (Product.price * Product.quantity).toFixed(2)
	if (Product.promoPrice !== "0") {
		returnPrice = (Product.promoPrice * Product.quantity).toFixed(2)
	}
	return returnPrice
}

const MenuCart = ({ Products, className }) => {
	const ProductsList = getProductsList(Products)
	return (
		<>
			{ProductsList.length !== 0
				? <div className={className}>
					{ProductsList}
				</div>
				: <div className={className}>
					<p style={{ whiteSpace: "nowrap", margin: 0 }}>Koszyk jest pusty!</p>
					<ALink to="/products">Kup najnowsze płyty!</ALink>
				</div>
			}
		</>
	)
}

export default MenuCart
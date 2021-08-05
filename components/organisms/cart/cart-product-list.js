import { useState, useEffect } from "react"
import { CartRow, Section } from "../../molecules"

const useProductsList = (Cart) => {
	let CartProducts = Cart.Cart
	let deleteProduct = Cart.deleteProduct
	const [Products, setProducts] = useState("")
	useEffect(() => {
		if (CartProducts.length) {
			setProducts(CartProducts.map(product => {
				return (
					<CartRow product={product} deleteProduct={Cart.deleteProduct} setQuantity={Cart.setQuantity} quantityTab />
				)
			}))
		}
		else {
			setProducts("Koszyk jest pusty")
		}
	}, [Cart])
	useEffect(() => {
		if (CartProducts.length) {
			setProducts(CartProducts.map(product => {
				return (
					<CartRow product={product} deleteProduct={Cart.deleteProduct} setQuantity={Cart.setQuantity} quantityTab />
				)
			}))
		}
		else {
			setProducts("Koszyk jest pusty")
		}
	}, [])
	return Products
}

const CartProductList = ({ Cart }) => {
	let Products = useProductsList(Cart)
	return (
		<Section className="cart-section">
			{Products}
		</Section>
	)
}

export default CartProductList
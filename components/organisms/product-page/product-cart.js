import { ProductRow, ProductTitle, LoginButton as Button, InputRow } from "../../molecules"
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../providers"

const useQuantityText = (quantity) => {
	let text = "Niedostępne"
	if (quantity >= 10) {
		text = " Dostępne"
	}
	else if (quantity >= 5) {
		text = "Ostatnie sztuki"
	}
	return text
}

const useQuantity = (quantity, Cart, code) => {
	const [Quantity, setQuantity] = useState(0)
	let quant = parseInt(quantity) - getQuantity(code, Cart)
	useEffect(() => {
		if (Quantity < 0) setQuantity(0)
		else if (Quantity >= quant) setQuantity(quant)
		else setQuantity(Quantity)
	}, [Quantity])
	return { Quantity, setQuantity }
}

const getQuantity = (code, Cart) => {
	let quantity = 0
	
	Cart.forEach((Product) => {
		if (Product.code === code) quantity = Product.quantity
	})
	return quantity
}

const ProductCart = ({ Price, Product }) => {
	const Cart = useContext(CartContext)
	const { Quantity, setQuantity } = useQuantity(Price.quantity, Cart.Cart, Price.code)
	const available = useQuantityText(Price.quantity)
	return (
		<div className="product-cart">
			<ProductRow>{available}</ProductRow>
			{Price.promoPrice !== "0"
				? <ProductTitle title={Price.promoPrice + " zł"} band={Price.price + " zł"} />
				: <ProductTitle title={Price.price + " zł"} />
			}
			<InputRow
				type="number"
				min="0"
				max={Price.quantity}
				value={Quantity}
				setValue={setQuantity}
				name="quantity"
				className="quantity-input"
			>
				Ilość
				</InputRow>
			<Button className="btn-cart" onClick={() => {Cart.addProduct({ ...Product, quantity: Quantity }); setQuantity(0)}}>Dodaj do koszyka</Button>
		</div>
	)
}

export default ProductCart
import { ALink } from '../atoms'

const usePromo = (price, promoPrice, quantity) => {

	let priceHtml = <div><p><span className="price">{(price * quantity).toFixed(2)}</span></p></div>

	if (promoPrice !== "0") {
		let discount = ((price - promoPrice) / price * 100).toFixed(0)
		priceHtml = <div className="price-tab">
			<p>
				<span className="crossed">{(price * quantity).toFixed(2)}</span>
				<span className="price">{(promoPrice * quantity).toFixed(2)}</span>
			</p>
			<p className="discount">oszczędzasz {discount}%</p>
		</div>
	}


	return priceHtml
}

const useQuantity = (product, setQuantity, deleteProduct) => {
	const { quantity, code } = product

	const changeQuantity = (productCode, change) => {
		if (quantity + change) setQuantity(productCode, parseInt(quantity) + parseInt(change))
	}

	let quantityTab = <div className="quantity-tab">
		<ALink className="pagination-button login-button" onClick={() => deleteProduct(product)}>
			<img style={{ width: '80%' }} src="../icons/trash.svg" />
		</ALink>
		<ALink className="pagination-button login-button" onClick={() => changeQuantity(code, -1)}>-</ALink>
		<p className="pagination-button login-button" style={{ cursor: "default" }}>{quantity}</p>
		<ALink className="pagination-button login-button" onClick={() => changeQuantity(code, 1)}>+</ALink>
	</div>

	return quantityTab
}

const CartRow = ({ product, deleteProduct, setQuantity, quantityTab, inline }) => {
	let promo = usePromo(product.price, product.promoPrice, product.quantity)
	let quantity = useQuantity(product, setQuantity, deleteProduct)
	let mainClass = "cart-row"
	if (inline) mainClass += " inline-row"
	return (
		<div className={mainClass}>
			<img src={"products/" + product.code + "/" + product.img} className="cart-row-image" />
			<div className="cart-row-content">
				<div className="cart-row-text">
					<ALink className="cart-row-title">{product.name}</ALink>
					<ALink className="cart-row-band">{product.band}</ALink>
				</div>
				<div>
					{quantityTab &&
						<>
							{quantity}
						</>
					}
					{promo}
				</div>
			</div>
		</div>
	)
}

export default CartRow
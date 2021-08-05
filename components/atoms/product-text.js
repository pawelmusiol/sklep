const ProductText = ({ name, band, price, promoPrice, onClick, children }) => {
	return (
		<div  className="product-widget-text">
			<div onClick={onClick}>
				<p>
					<span style={{ fontWeight: 'bold' }}>
						{band} &nbsp;
				</span>
					{name}
				</p>
			</div>
			<div className="row">
				{children}
				{usePromotion(price, promoPrice)}
			</div>
		</div>
	)
}

const usePromotion = (price, promoPrice) => {
	let priceClass = null
	let promo

	if (promoPrice !== "0") {
		priceClass = "crossed"
		promo = <span>{promoPrice}</span>
	}
	return (
		<p className="price">
			<span className={priceClass}>{price}</span>
			{promo}
		zł
		</p>
	)
}

export default ProductText
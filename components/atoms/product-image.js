const ProductImage = ({src, onClick}) => {
	return (
		<div onClick={onClick} className="image-container">
		<img src={src} className="widget-image" alt="product image" />
		</div>
	)
}

export default ProductImage

const ProductTitle = ({ title, band, className }) => {

	let mainClassName = "product-title "
	if (className) mainClassName += className

	return (
		<div className={mainClassName}>
			<h1>{title}</h1>
			{band &&
				<h2>{band}</h2>
			}
		</div>
	)
}

export default ProductTitle
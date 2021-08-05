import { ALink } from "../../atoms"
import { ProductTitle, ProductRow } from "../../molecules"

const ProductParameters = ({ Product }) => {
	const Subgenres = Product.subgenre.map((subgenre, key) => {
		let before = " "
		if (key !== 0) before = ", "
		return (
			<>
				{before}
				<ALink to={"/products?style=" + subgenre}>{subgenre}</ALink>
			</>
		)
	})
	const releaseDate = new Date(Product.releaseDate)

	return (
		<div className="product-parameters">
			<ProductTitle title={Product.name} band={Product.band} />
			<ProductRow title="Kod Produktu">{Product.code}</ProductRow>
			<ProductRow title="Gatunek"><ALink to={"/products?genre=" + Product.genre} >{Product.genre}</ALink></ProductRow>
			<ProductRow title="Styl">{Subgenres}</ProductRow>
			<ProductRow title="Format"><ALink to={"/products?category=" + Product.format} >{Product.format}</ALink></ProductRow>
			<ProductRow title="Data Wydania">{releaseDate.toLocaleDateString()}</ProductRow>
		</div>
	)
}

export default ProductParameters
import { ProductsSection, FilterMenu } from "../../components/organisms"


const Products = () => {
	return (
		<div className="content products-page">
		<FilterMenu />
		<ProductsSection pagination />
		</div>
	)
}

export default Products
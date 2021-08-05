import { ProductText, ProductImage } from "../atoms"
import { LoginButton as Button } from "./"
import { useRouter } from "next/router"
import { usePre } from "../helpers"

const usePushToProduct = (code) => {
	const router = useRouter()
	const pre = usePre()
	return () => router.push(pre + 'products/' + code)
}

const ProductWidget = ({ name, band, price, src, code, promoPrice, addToCart }) => {
	const pre = usePre()
	const pushToProduct = usePushToProduct(code)

	return (
		<div className="product-widget">
			<ProductImage onClick={() => pushToProduct()} src={pre + "products/" + code + "/" + src} />
			<ProductText onClick={() => pushToProduct()} name={name} band={band} price={price} promoPrice={promoPrice}>
				<Button className="widget-button" onClick={() => addToCart()}>Dodaj do koszyka</Button>
			</ProductText>

		</div>
	)
}

export default ProductWidget
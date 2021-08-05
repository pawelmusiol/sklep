import { useEffect, useState } from "react"
import axios from "axios"
import { Section } from "../../molecules"
import { ALink } from "../../atoms"
import { useRouter } from "next/router"

const getPrice = (Cart) => {
	let price = 0
	Cart.forEach(product => {
		if (product.promoPrice !== "0" && product.promoPrice !== 0) {
			price += parseFloat(product.promoPrice * product.quantity)
		}
		else {
			price += parseFloat(product.price * product.quantity)
		}
	})
	return price.toFixed(2)
}

const getToken = (Cart) => {
	let token = ""
	if (Cart.CartToken) {
		token = Cart.CartToken
	}

	return token
}

const useData = (Cart) => {
	const [ItemCount, setItemCount] = useState(0)
	const [Price, setPrice] = useState(0)
	const [Delivery, setDelivery] = useState({})
	useEffect(() => {
		setDelivery(Cart.Delivery)
		setItemCount(Cart.Cart.length)
		setPrice(getPrice(Cart.Cart))
	}, [Cart])
	return { ItemCount, Price, Delivery }
}

const setData = (Cart) => {
	let data = {}
	data.Payment = {
		Address: Cart.Address,
		Type: Cart.Payment.type,
		Price: Cart.Payment.price
		
	}
	data.Products = Cart.Cart
	data.Delivery = {
		Address: Cart.Delivery.Address,
		Price: Cart.Delivery.price,
		Type: Cart.Delivery.type,
	}
	data.UserToken = Cart.UserToken
	return data
}

const SendCart = async (Cart, router) => {
	axios.put("../api/cart/" + getToken(Cart), setData(Cart)).then(result => {
		console.log(result)
		Cart.CleanCart()
		console.log(Cart)
		router.push("../user/orders")
	}).catch(err => {
		console.log(err)
	})
}

const CartNext = ({ Cart, Step, setStep }) => {
	const router = useRouter()
	const { ItemCount, Price, Delivery } = useData(Cart)
	return (
		<Section className="cart-section">
			{Step === 0 &&
				<>
					<p>Ilość produktów: {ItemCount}</p>
					<p>Suma: {Price}</p>
					<ALink onClick={() => setStep(1)}>Dostawa</ALink>
				</>
			}
			{Step === 1 &&
				<>
					<p>Produkty:{Price}</p>
					<p>Dostawa:{Delivery.price}</p>
					<ALink onClick={() => setStep(2)}>Podsumowanie</ALink>
				</>
			}
			{Step === 2 &&
				<>
					<ALink onClick={() => SendCart(Cart, router)}>Przejdź do płatności</ALink>
				</>
			}
		</Section>
	)
}

export default CartNext
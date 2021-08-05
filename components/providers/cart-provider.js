import React, { useState, useEffect } from 'react';
import { ALink } from "../atoms"
import { Modal, MenuCart } from "../molecules"
import axios from "axios"
import { ProductsSection } from "../organisms"
import { usePre } from "../helpers"
import { useCookies } from "react-cookie"
import { useRouter } from "next/router"

export const CartContext = React.createContext({
	Cart: [],
	Delivery: {},
	Address: {},
	Payment: {},
	userToken: "",
	cartToken: 0,
	setCart: () => { },
	setDelivery: () => { },
	setAddress: () => { },
	setPayment: () => { },
	setUserToken: () => { },
	addProduct: () => { },
	deleteProduct: () => { },
	cleanCart: () => { },
})

const useGetCartApi = (setCart) => {
	const [cookies, setCookie] = useCookies(['cartToken'])
	const pre = usePre()
	useEffect(() => {

		if (cookies.cartToken) {

			axios.get(pre + "api/cart", {
				headers: {
					cartToken: cookies.cartToken
				}
			}).then(response => {
				setCart(ProductsToCart(response.data.products))
				setCookie("cartToken", response.data.token)
			})

		}
		else {
			axios.get(pre + "api/cart").then((response) => {
				setCookie("cartToken", response.data.token)
			})
		}
	}, [])
}

const ProductsToCart = (products) => {
	let retProducts = []
	if (products.length) {
		products.forEach(product => {
			retProducts.push({
				img: product.img[0],
				code: product.code,
				name: product.name,
				band: product.band[0].name,
				price: product.price.$numberDecimal,
				promoPrice: product.promoPrice.$numberDecimal,
				quantity: product.quantity,
			})
		})
	}
	return retProducts
}

const PostProductApi = async (product, cookies, pre) => {
	let result = await axios.post(pre + "api/cart", {
		product: {
			code: product.code,
			quantity: product.quantity
		}
	}, {
		headers: {
			cartToken: cookies.cartToken
		}
	})

	return result.data
}

const tokenToContext = (cookies, setCartToken) => {
	useEffect(() => {
		if (cookies.cartToken) {
			return setCartToken(cookies.cartToken)
		}
	}, [cookies.cartToken])
}

const useCart = (OpenModalWithProduct) => {
	const [Cart, setCart] = useState([])
	const [CartToken, setCartToken] = useState(0)
	const [cookies, setCookie] = useCookies(['cartToken'])
	useGetCartApi(setCart)
	tokenToContext(cookies, setCartToken)
	const pre = usePre()
	const addProduct = async (Product) => {

		let exist = false
		let TempCart = Cart
		let ApiProduct = Product
		TempCart.forEach(CartProduct => {
			if (CartProduct.code === Product.code) {
				exist = true
				CartProduct.quantity = parseInt(CartProduct.quantity) + parseInt(Product.quantity)
				ApiProduct = CartProduct
			}
		})
		let result = await PostProductApi(ApiProduct, cookies, pre)

		if (exist) setCart(TempCart)
		else setCart([...Cart, Product])
		OpenModalWithProduct(Product)
	}
	const deleteProduct = async (Product) => {
		let result = await axios.delete(pre + "api/cart", {
			headers: {
				carttoken: CartToken,
				product: Product.code
			}
		})
		if (result.status === 200) {
			setCart(Cart.filter((result) => {
				return result.code !== Product.code
			}))
		}
	}

	const setQuantity = (code, quantity) => {
		let TempProducts = []
		Cart.forEach(cartProduct => {
			if (cartProduct.code === code) {
				cartProduct.quantity = quantity
			}
			TempProducts.push(cartProduct)
		})
		setCart(TempProducts)
	}

	return { Cart, CartToken, setCart, addProduct, deleteProduct, setQuantity }
}

const useDelivery = () => {
	const [Delivery, setDelivery] = useState({ type: 0, price: (0).toFixed(2), paymentTypes: [] })
	return { Delivery, setDelivery }
}

const usePayment = () => {
	const [Payment, setPayment] = useState({ type: 0, price: (0).toFixed(2) })
	return { Payment, setPayment }
}
const useUserToken = () => {
	const [UserToken, setUserToken] = useState("");
	return { UserToken, setUserToken }
}

const useAddress = () => {
	const [Address, setAddress] = useState({
		street: "",
		city: "",
		number: "",
		postal: "",
		phone: "",
		validation: false

	})
	return { Address, setAddress }
}

const useCleanCart = (setCart, setDelivery, setAddress, setPayment) => {
	const [cookies, setCookie, removeCookie] = useCookies(['cartToken'])
	return () => {
		removeCookie("cartToken")
		setCart([])
		setDelivery({ type: 0, price: (0).toFixed(2), paymentTypes: [] })
		setAddress({
			street: "",
			city: "",
			number: "",
			postal: "",
			phone: "",
			validation: false
		})
		setPayment({ type: 0, price: (0).toFixed(2) })
	}

}

const useModal = () => {
	const [Open, setOpen] = useState(false)
	const [Product, setProduct] = useState({})

	const OpenModalWithProduct = (Product) => {
		setOpen(true)
		setProduct(Product)
	}

	const CartModal = (<>
		{Open &&
			<Modal title="Dodano Do Koszyka" onExit={() => setOpen(false)}>
				<MenuCart className="modal-cart" Products={[Product]} />
				<div className="recommended">
					<ProductsSection title="Może Ci się spodobać" url="/products?genre=metal&limit=4"></ProductsSection>
				</div>
				<div className="next">
					<ALink onClick={() => setOpen(false)}>Kontynuuj zakupy</ALink>
					<ALink to="/cart">Przejdź do koszyka</ALink>
				</div>
			</Modal>
		}
	</>)

	return { CartModal, OpenModalWithProduct }
}

const CartProvider = ({ children }) => {
	const { CartModal, OpenModalWithProduct } = useModal()
	const { Cart, CartToken, setCart, addProduct, deleteProduct, setQuantity } = useCart(OpenModalWithProduct)
	const { Delivery, setDelivery } = useDelivery()
	const { Address, setAddress } = useAddress()
	const { Payment, setPayment } = usePayment()
	const { UserToken, setUserToken } = useUserToken()
	const CleanCart = useCleanCart(setCart, setDelivery, setAddress, setPayment)

	return (
		<CartContext.Provider value={{ Cart, Delivery, Address, Payment, UserToken, CartToken, setCart, setDelivery, setAddress, setPayment, setUserToken, addProduct, deleteProduct, setQuantity, CleanCart }}>
			{CartModal}
			{children}
		</CartContext.Provider >
	)
}

export default CartProvider
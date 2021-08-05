import { CartContext, UserContext } from "../components/providers"
import {
	CartProductList,
	CartDeliveryList,
	CartAddress,
	CartNext,
	CartSummary,
	LoginModal,
	PaymentListSection as PaymentList
} from "../components/organisms"
import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

const CheckForUser = (User) => {
	if(User._id === "") return true 
	else return false
}

const useStep = () => {
	const Cart = useContext(CartContext)
	const User = useContext(UserContext)
	const [Step, setStep] = useState(0)
	const [Content, setContent] = useState(<></>)
	const [ModalOpen, setModalOpen] = useState({open: CheckForUser(User), register: false});
	
	useEffect(() => {
		Cart.setUserToken(User.token)
	}, [ ,User])
	
	const selectContent = () => {
		if (Step === 0) {
			setContent(
				<>
					<div className="cart-left">
						<CartProductList Cart={Cart} />
					</div>
					<div className="cart-right">
						<CartNext Cart={Cart} Step={Step} setStep={setStep} />
					</div>
				</>
			)
		}
		if (Step === 1) {
			setContent(
				<>
				<LoginModal open={ModalOpen} setOpen={setModalOpen} />
					<div className="cart-left">
						<CartDeliveryList setDelivery={Cart.setDelivery} />
						<PaymentList types={Cart.Delivery.paymentTypes} setPayment={Cart.setPayment} />
						<CartAddress
							title="Cart Address"
							setAddress={Cart.setAddress}
							Address={Cart.Address}
							DeliveryAddress={Cart.Delivery.Address}
							DeliveryType={Cart.Delivery.type}
							PaymentTypes={Cart.Delivery.payment}
						/>
					</div>
					<div className="cart-right">
						<CartNext Cart={Cart} Step={Step} setStep={setStep} />
					</div>
				</>
			)
		}
		if (Step === 2) {
			setContent(
				<>
					<div className="cart-left">
						<CartSummary 
						Products={Cart.Cart}
						Delivery={Cart.Delivery}
						Payment={Cart.Payment}
						Address={Cart.Address}
						setStep={setStep}
							/>
					</div>
					<div className="cart-right">
						<CartNext Cart={Cart} Step={Step} setStep={setStep} />
					</div>
				</>
			)
		}
	}

	useEffect(() => {
		selectContent()
	}, [Cart, Step])

	return Content
}

const CartPage = () => {
	const Content = useStep()
	return (
		<div className="cart-container">
			{Content}
		</div>
	)
}
export default CartPage
import { ALink } from "../../atoms"
import { Section, CartRow, AddressWidget } from '../../molecules'
import {DeliveryList, PaymentList } from "../../helpers"

const setProductList = (Products) => {
	return Products.map(Product => <CartRow product={Product} inline />)
}

const getName = (List, Type) => {
	let name
	List.forEach(row => {
		if (row.type === Type) {
			console.log(row.name)
			name = row.name
		}
	})
	return name
}

const CartSummary = ({ Products, Delivery, Payment, Address, setStep }) => {
	console.log(getName(DeliveryList,Delivery.type))
	return (
		<Section title="Podsumowanie" className="">
			<Section className="cart-section">
				<div className="summary-title">
					<h2>Koszyk </h2>
					<ALink onClick={() => setStep(0)}>Zmień</ALink>
				</div>
				{setProductList(Products)}
			</Section>
			<Section className="addresses cart-section">
				<div> 
					<div className="summary-title">
						<h2>Dostawa </h2>
						<ALink onClick={() => setStep(1)}>Zmień</ALink>
					</div>
					<div>
						<p>{getName(DeliveryList,Delivery.type)}</p>
					</div>
					<AddressWidget Address={Delivery.Address} />
				</div>
				<div>
					<div className="summary-title">
						<h2>Płatność </h2>
						<ALink onClick={() => setStep(1)}>Zmień</ALink>
					</div>
					<div>
						<p>{getName(PaymentList,Payment.type)}</p>
					</div>
					<AddressWidget Address={Address} />
				</div>
			</Section>
		</Section>
	)
}

export default CartSummary
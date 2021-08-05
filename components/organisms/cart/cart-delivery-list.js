import { Section, CartDeliveryRow as Row } from '../../molecules'
import { DeliveryList } from "../../helpers"
import { useState, useEffect } from "react"
import Head from "next/head"

const CartDeliveryList = ({ setDelivery }) => {
	const [Selected, setSelected] = useState(0);
	const [Address, setAddress] = useState({})
	const [DeliveryType, setDeliveryType] = useState({})
	const DeliveryDom = DeliveryList.map((delivery => {

		return (
			<Row
				delivery={delivery}
				Selected={Selected}
				setSelected={setSelected}
				setDelivery={setDeliveryType}
				Address={Address}
				setAddress={setAddress}
			/>
		)
	}))

	useEffect(() => {
		setDelivery({ ...DeliveryType, Address: Address })
	}, [DeliveryType, Address])

	return (
		<>
			<Head>
				<script async src="https://geowidget.easypack24.net/js/sdk-for-javascript.js"></script>
				<link rel="stylesheet" href="https://geowidget.easypack24.net/css/easypack.css" />
			</Head>
			<Section title="Cart Delivery List" className="cart-section">
				<div onChange={e => console.log(e.target.value)}>
					{DeliveryDom}
				</div>
			</Section>
		</>
	)
}

export default CartDeliveryList
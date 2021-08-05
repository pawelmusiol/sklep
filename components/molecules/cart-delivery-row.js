import { useState, useEffect } from "react"

const CartDeliveryRow = ({ delivery, Selected, setSelected, setDelivery, Address, setAddress}) => {
	const [Color, setColor] = useState("#eee")
	const [Checked, setChecked] = useState(false);
	const [Display, setDisplay] = useState("none")
	useEffect(() => {
		if (Selected === delivery.type) {
			setChecked(true)
			setColor("#ededed")
		}
		else {
			setChecked(false)
			setColor("#fff")
		}
	}, [Selected])
	useEffect(() => {
		if (Checked) {
			setDisplay("block")
		}
		else{
			setDisplay("none")
		}
		
	}, [Checked])
	
	

	
	return (
		<div>
			<div
				className="cart-delivery-row"
				style={{ backgroundColor: Color }}
				onMouseEnter={() => { if (Color !== "#ededed") setColor("#eee") }}
				onMouseLeave={() => { if (Color !== "#ededed") setColor("#fff") }}
				onClick={() => {
					setSelected(delivery.type)
					setColor("#ededed")
					setDelivery({ type: delivery.type, price: delivery.price, paymentTypes: delivery.paymentTypes })
				}}
			>
				<p>{delivery.name}</p>
				<p>{delivery.price}</p>
				<p>Czas oczekiwania: {delivery.time}</p>
				<input type="radio" name="delivery" value={delivery.type} checked={Checked} />
			</div>
			<div style={{display:Display}}>
				{delivery.dropdown(Address, setAddress, setSelected)}
			</div>
		</div>
	)
}

export default CartDeliveryRow
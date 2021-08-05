import { useState, useEffect } from "react"

const PaymentRow = ({Selected, setSelected, payment, setPayment}) => {
	const [Color, setColor] = useState("#eee")
	const [Checked, setChecked] = useState(false);
	useEffect(() => {
		if (Selected === payment.type) {
			setChecked(true)
			setColor("#ededed")
		}
		else {
			setChecked(false)
			setColor("#fff")
		}
	}, [Selected])
	return(
		<div
				className="cart-delivery-row"
				style={{ backgroundColor: Color }}
				onMouseEnter={() => { if (Color !== "#ededed") setColor("#eee") }}
				onMouseLeave={() => { if (Color !== "#ededed") setColor("#fff") }}
				onClick={() => {
					setSelected(payment.type)
					setColor("#ededed")
					setPayment({ type: payment.type, price: payment.price })
				}}
			>
				<p>{payment.name}</p>
				<p>{payment.price} zł</p>
				<input type="radio" name="payment" value={payment.type} checked={Checked} />
			</div>
	)
}

export default PaymentRow
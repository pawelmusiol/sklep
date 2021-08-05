import { PaymentList } from "../helpers"
import { PaymentRow as Row, Section } from "../molecules"
import { useState, useEffect } from "react"


const usePaymentDom = (types, setPayment) => {
	const [List, setList] = useState(<div />)
	const [Selected, setSelected] = useState(0)
	useEffect(() => {
		setList(setPaymentDom(types, setPayment, Selected, setSelected))
	}, [])
	useEffect(() => {
		setList(setPaymentDom(types, setPayment, Selected, setSelected))
	}, [types, Selected])
	return List
}

const setPaymentDom = (types, setPayment, Selected, setSelected) => {
	let PaymentDom = []
	if (types) {
		types.forEach(type => {
			PaymentList.forEach(payment => {
				if (type === payment.type) {
					PaymentDom.push(<Row
						Selected={Selected}
						setSelected={setSelected}
						payment={payment}
						setPayment={setPayment}
					/>)
				}
			})
		})
	}
	return PaymentDom
}

/**
 * 
 * @param {Array} types 
 */

const PaymentListSection = ({ types, setPayment }) => {
	const List = usePaymentDom(types, setPayment)

	return (
		<Section title="payment" className="cart-section">
			{List}
		</Section>
	)
}

export default PaymentListSection
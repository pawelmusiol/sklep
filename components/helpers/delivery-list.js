import { CartAddress } from "../organisms"
import { InputRow, AddressWidget, Section } from "../molecules"
import { useState, useEffect } from "react"

const deliveryList = [
	{ type: 1, paymentTypes: [1,2,3], name: 'Poczta Polska', price: 9.99, time: "3dni", dropdown: (Address, setAddress) => { return (<CartAddress Address={Address} setAddress={setAddress}/>) } },
	{ type: 2, paymentTypes: [1,2,3], name: 'Kurier DPD', price: 16.99, time: "2-3 dni", dropdown: (Address, setAddress) => { return (<CartAddress Address={Address} setAddress={setAddress}/>) } },
	{
		type: 3, paymentTypes: [2,3], name: 'Paczkomat inPost', price: 12.99, time: "1-2 dni", dropdown: (Address, setAddress) => {
			return (<InPost Address={Address} setAddress={setAddress} />)
		}
	},
	{ type: 4, paymentTypes: [0,2,3], name: 'Odbiór w punkcie', price: 0, time: "od ręki", dropdown: (Address, setAddress) => { } },
]

const InPost = ({ Address, setAddress}) => {
	const [Phone, setPhone] = useState("")
	const [InPost, setInPost] = useState({})
	const [Display, setDisplay] = useState({ map: "block", widget: "none" })
	const [Checked, setChecked] = useState(false)
	useEffect(() => {
		console.log(Phone)
		setAddress({ ...Address, phone: Phone })
	}, [Phone])
	useEffect(() => {
		if (Address.phone === undefined || Address.phone === "") {
			console.log(Address)
			alert("Podaj numer telefonu")
		}
		else {
			setAddress({
				...InPost,
				phone: Address.phone
			})
			setChecked(true)
		}
	}, [InPost])
	useEffect(() => {
		if (Checked) {
			setDisplay({ map: "none", widget: "block" })
		}
		else {
			setDisplay({ map: "block", widget: "none" })
		}

	}, [Checked])

	window.easyPackAsyncInit = function () {
		easyPack.init({});
		var map = easyPack.mapWidget('easypack-map', function (point) {
			console.log(point)
			let setNumber = function () {
				if (point.address_details.flat_number) {
					return point.address_details.building_number + "/" + point.address_details.flat_number
				}
				else return point.address_details.building_number
			}
			setInPost({
				...{

					name: point.name,
					street: point.address_details.street,
					number: setNumber(),
					postal: point.address_details.post_code,
					city: point.address_details.city
				}
			})
		});
	}

	return (
		<>
			<div style={{ display: Display.map, marginTop: "10px" }}>
				<InputRow value={Phone} setValue={setPhone}>Numer Telefonu</InputRow>
				<div id="easypack-map"></div>
			</div>
			<Section style={{ display: Display.widget }} className="cart-section address-section">
				<AddressWidget Address={Address} onClick={() => setChecked(false)} change />
			</Section>
		</>
	)
}

export default deliveryList
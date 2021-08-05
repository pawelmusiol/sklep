import { ALink } from '../../atoms'
import { Section, InputRow, AddressWidget } from '../../molecules'
import { useState, useEffect } from "react"

const useAddress = (setAddress, DeliveryAddress, SameAddress, setSameAddress, setSaveAddress) => {
	const [Name, setName] = useState("");
	const [Street, setStreet] = useState("")
	const [Number, setNumber] = useState("")
	const [Flat, setFlat] = useState("")
	const [Postal, setPostal] = useState("")
	const [City, setCity] = useState("")
	const [Phone, setPhone] = useState("")

	useEffect(() => {
		if (SameAddress) {
			setName(DeliveryAddress.name)
			setStreet(DeliveryAddress.street)
			setNumber(DeliveryAddress.number)
			setFlat(DeliveryAddress.flat)
			setPostal(DeliveryAddress.postal)
			setCity(DeliveryAddress.city)
			setPhone(DeliveryAddress.phone)
			setAddress({
				name: Name,
				street: Street,
				number: Number,
				flat: Flat,
				postal: Postal,
				city: City,
				phone: Phone
			})
			if (!ValidateAddress(DeliveryAddress, setSaveAddress)) setSameAddress(false)
		}
		else setSaveAddress(false)
	}, [SameAddress])
	const AddressDom = (
		<>
			<div>
				<InputRow value={Name} setValue={setName}>Imię i Nazwisko</InputRow>
				<InputRow value={Phone} setValue={setPhone}>Numer Telefonu</InputRow>

			</div>
			<div>
				<InputRow value={Street} setValue={setStreet}>Ulica</InputRow>
				<div className="address-number">
					<InputRow value={Number} setValue={setNumber}>Numer Domu</InputRow>
					<InputRow value={Flat} setValue={setFlat}>Numer Mieszkania</InputRow>
				</div>
			</div>
			<div>
				<InputRow value={City} setValue={setCity}>Miasto</InputRow>
				<InputRow value={Postal} setValue={setPostal}>Kod Pocztowy</InputRow>
			</div>

		</>
	)

	useEffect(() => {

		setAddress({
			name: Name,
			street: Street,
			number: Number,
			flat: Flat,
			postal: Postal,
			city: City,
			phone: Phone
		})
	}, [Name, Street, Number, Flat, Postal, City, Phone])

	return AddressDom
}


const CartAddress = ({ setAddress, Address, title, DeliveryAddress, DeliveryType }) => {

	const [SaveAddress, setSaveAddress] = useState(false)
	const [SameAddress, setSameAddress] = useState(false)
	const AddressDom = useAddress(setAddress, DeliveryAddress, SameAddress, setSameAddress, setSaveAddress)
	const inPost = () => {
		if (DeliveryType !== 3) {
			return true
		}
	}
	return (
		<Section title={title} className="cart-section address-section">
			{(DeliveryAddress && inPost()) && <div>
				<p>Adres jak w dostawie?</p>
				<InputRow
					type="checkbox"
					setValue={setSameAddress}
					value={SameAddress}>
				</InputRow>
			</div>}
			{
				SaveAddress ?
					<AddressWidget Address={Address} onClick={() => { setSaveAddress(false); setSameAddress(false) }} change />
					:
					<>
						{AddressDom}
						<ALink onClick={() => ValidateAddress(Address, setSaveAddress)}>Zatwierdź</ALink>
					</>
			}
		</Section>
	)
}

const ValidateAddress = (Address, Save) => {
	let alertValue = false
	if (Address.name === undefined || Address.name === "") {
		alertValue = "e imię"
	}
	else if (Address.street === undefined || Address.street === "") {
		alertValue = "ą ulicę"
	}
	else if (Address.number === undefined || Address.number === "") {
		alertValue = "y numer"
	}
	else if (Address.postal === undefined || Address.postal === "") {
		alertValue = "y kod pocztowy"
	}
	else if (Address.city === undefined || Address.city === "") {
		alertValue = "e miasto"
	}
	else if (Address.phone === undefined || Address.phone === "") {
		alertValue = "y numer telefonu"
	}
	if (alertValue) {
		alert(`Podaj poprawn${alertValue}`)
		return false
	}
	else {
		Save(true)
		return true
	}
}


export default CartAddress
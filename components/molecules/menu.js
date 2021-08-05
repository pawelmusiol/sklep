import { ALink } from "../atoms"
import { MenuCart, InputRow as Input } from "./"
import { useContext, useState } from 'react'
import { UserContext, CartContext } from '../providers'
import { usePre } from "../helpers"
import { useRouter } from "next/router"

const useLogged = (OpenLogin) => {
	const [MouseOver, setMouseOver] = useState(false)
	const User = useContext(UserContext)
	const pre = usePre()
	if (User._id) {
		return (
			<>
				<ALink className="menu-link" to={pre + "user"}>
					<img className="menu-icon" src={pre + "icons/user.svg"} />
				</ALink>
			</>
		)
	}
	else {

		return (
			<div className="menu-div"
				onMouseEnter={() => setMouseOver(true)}
				onMouseLeave={() => setMouseOver(false)}>
				<ALink className="menu-link">
					<img className="menu-icon" src={pre + "icons/user.svg"} />
				</ALink>
				{MouseOver &&
					<div className="down-menu">
						< ALink className="menu-link" onClick={() => { OpenLogin({ open: true, register: false }) }} >
							Zaloguj się
						</ALink>
						<ALink className="menu-link" onClick={() => { OpenLogin({ open: true, register: true }) }}>
							Zarejestruj się
						</ALink>
					</div>
				}
			</div>
		)
	}
}

const useCart = () => {
	const [MouseOver, setMouseOver] = useState(false)
	const pre = usePre()
	const Cart = useContext(CartContext)
	let productCount = Cart.Cart.length

	return (
		<div className="menu-div"
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}>
			<ALink
				className="menu-link"
				to={pre + "cart"}
			>
				<img className="menu-icon" src={pre + "icons/cart.svg"} />
				{productCount}
			</ALink>
			{
				MouseOver &&
				<div className="down-menu">
					<MenuCart Products={Cart.Cart} />
				</div>
			}
		</div>
	)
}

const useSearch = () => {
	const router = useRouter()
	const [InputOpen, setInputOpen] = useState(false)
	const [Value, setValue] = useState("")
	const pre = usePre()

	return (
		<>
			{InputOpen
				? <div className="search-input">
					<ALink onClick={() => setInputOpen(false)}>x</ALink>
					<Input
						type="text"
						value={Value}
						setValue={setValue}
					></Input>
					<ALink
						className="menu-link"
						onClick={() => router.push(pre + "products?search=" + Value)}
					>
						<img className="menu-icon" src={pre + "icons/search.svg"} />
					</ALink>
				</div>
				: <ALink
					className="menu-link"
					onClick={() => setInputOpen(true)}
				>
					<img className="menu-icon" src={pre + "icons/search.svg"} />
				</ALink>
			}

		</>
	)
}

const Menu = ({ OpenLogin }) => {

	const Logged = useLogged(OpenLogin)
	const Cart = useCart()
	const Search = useSearch()
	return (
		<>
			<div className="menu-buttons">
				<ALink className="menu-link" to="/products?category=CD">CD</ALink>
				<ALink className="menu-link" to="/products?category=vinyl">Winyle</ALink>
				<ALink className="menu-link" to="/products?category=promo">Promocje</ALink>
			</div>
			<div className="menu">
				{Search}
				{Logged}
				{Cart}
			</div>
		</>
	)
}

export default Menu
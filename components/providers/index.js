import UserProvider, { UserContext } from "./user-provider"
import CartProvider, { CartContext } from "./cart-provider"
import { CookiesProvider } from "react-cookie"

const CombinedProviders = ({ children }) => {
	return (
		<CookiesProvider>
			<UserProvider>
				<CartProvider>
					{children}
				</CartProvider>
			</UserProvider>
		</CookiesProvider>
	)
}

export {
	UserProvider,
	UserContext,
	CartProvider,
	CartContext
}

export default CombinedProviders
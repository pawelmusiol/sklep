import { ALink } from "../atoms"

const MenuRow = ({ children, to, className }) => {
	let mainClass = "menu-row "
	if (className) mainClass += className

	return (
		<ALink to={to} className={mainClass}>{children}</ALink>
	)
}

export default MenuRow
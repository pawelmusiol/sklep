import { Menu } from "../molecules"
import { ALink } from "../atoms"

const TopBar = ({ OpenLogin }) => {
	return (
		<div className="top-bar">
			<div className="top-bar-content">
				<ALink to="/"><h2 className="menu-logo">Sklep</h2></ALink>
				<Menu OpenLogin={OpenLogin} />
			</div>
		</div>
	)
}

export default TopBar
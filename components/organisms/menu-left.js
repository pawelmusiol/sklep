import { MenuRow } from "../molecules"
import { useState, useEffect } from "react"


const LeftMenu = ({ className, menuValues }) => {
	let mainClass = "left-menu "
	if (className) mainClass += className
	let menuContent = useMenuValues(menuValues)


	return (
		<div className={mainClass}>
			{menuContent}
		</div>
	)
}

const useMenuValues = (menuValues) => {
	const [MenuContent, setMenuContent] = useState("")
	useEffect(() => {
		if (menuValues) {
			menuValues.map((value => {
				let children = {}
				if (value.children) {
					children = value.children.map(child => <MenuRow to={"../products?"+value.type+"="+child.path}>{child.text}</MenuRow>)
				}
				setMenuContent(
					<>
						<MenuRow to={value.path}>{value.text}</MenuRow>
						{children &&
							< div className="menu-column" >
							{ children }
						</div>
			}
					</>
				)
			}))
		}
	}, [menuValues])
return MenuContent
}

export default LeftMenu
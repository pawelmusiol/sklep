import {useState, useEffect } from 'react'

const Row = ({ children, onClick, value, checked, setChecked}) => {
	const [Style, setStyle] = useState({ backgroundColor: "#fff" })

	const setColor = () => {
		if (checked) {
			setStyle({ backgroundColor: "#0082FA88" })
		}
		else {
			setStyle({ backgroundColor: "#eee" })
		}
	}

	useEffect(() => {
		setColor()
	}, [checked])
	useEffect(() => {
		setColor()
	},[])

	const handleClick = (e) => {
		if (checked) {
			onClick(value)
			setChecked()
		}
		else {
			onClick(value, true)
			setChecked()
		}
	}

	return (
		<div onClick={handleClick} className="filter-row" style={Style}>
			{children}
		</div>
	)
}

export default Row
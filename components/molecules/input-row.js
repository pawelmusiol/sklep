import { Label, Input } from "../atoms"
import { useState, useEffect } from "react"



const inputRow = ({ children, name, value, setValue, placeholder, type, min, max, className }) => {


	const [Style, setStyle] = useState({ fontSize: "1rem", top: ".5rem"})
	useEffect(() => {
		if (value === 0) {
			setStyle({ fontSize: "0.8rem", top: "-10px" })
		}
	}, [])
	const onFocus = (e) => {
		setStyle({ fontSize: "0.8rem", top: "-10px" })
	}
	const onBlur = (e) => {
		if (!e.target.value) {
			setStyle({ fontSize: "1rem", top: ".5rem" })
		}

	}
	let MainClass = "input-group "
	if (className) MainClass += className

	return (
		<div className={MainClass}>
			{children &&
				<Label htmlFor={name} style={{...Style, pointerEvents: "none"}}>{children}</Label>
			}
			<Input
				onBlur={onBlur}
				onFocus={onFocus}
				placeholder={placeholder}
				value={value}
				setValue={setValue}
				name={name}
				type={type}
				min={min}
				max={max}
				className="login-input"></Input>
		</div>
	)
}

export default inputRow
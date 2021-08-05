import { useEffect, useState, useRef } from "react"

const Input = ({ value, setValue, placeholder, type, name, className, onFocus, onBlur }) => {
	const InputRef = useRef(null)

	useEffect(() => {
		if (value !== "") {
			onFocus()
		}
	}, [])
	useEffect(() =>{
		if (type === "checkbox") {
			if (value === false) {
				console.log(value)
				InputRef.current.checked = false
			}
		}
	},[value])

	const onChange = (e) => {
		if (type !== "checkbox") setValue(e.target.value)
		else{
			if (e.target.checked === true) {
				setValue(true)
			}
			else{
				setValue(false)
			}
		}
	}

	return (
		<input
		ref={InputRef}
			onFocus={onFocus}
			onBlur={onBlur}
			className={className}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			name={name}>

		</input>
	)
}
export default Input
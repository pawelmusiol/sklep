import React, { useState, useEffect, useRef } from 'react'
import { FilterRow } from "../atoms"

/**
 * @param {Object[]} paths
 * @param {string} paths[].text
 * @param {string} paths[].path
 */

const FilterSegment = ({ paths, Parameters, setParameters, one }) => {
	const handleClick = (value, add) => {
		if (add) {
			setParameters([...Parameters, value])
		}
		else {

			setParameters(Parameters.filter(parameter => parameter !== value))
		}
	}
	const handleOneClick = (value) => {
		setParameters([value])
		paths.forEach(path =>{
			if (path.value !== value) {
				path.checked = false
			}
		})
	}
	let onClick  = handleClick
	if (one) {
		onClick = handleOneClick
	}

	let Rows = paths.map(path => (
		<FilterRow
			value={path.path}
			onClick={onClick}
			checked={path.checked}
			setChecked={() => { path.checked = !path.checked }}
		>
			{path.text}
		</FilterRow>))


	return (
		<>
			{ Rows}
		</>
	)
}

export default FilterSegment
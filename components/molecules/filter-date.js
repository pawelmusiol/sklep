const FilterDate = ({value, setValue}) => {


	return(
		<input type="date" value={value} onChange={e => setValue(e.target.value)} />
	)
}

export default FilterDate
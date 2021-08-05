
const Row = ({ title, children, className }) => {

	let classP = "product-row "
	if (className) classP += className

	if (title) {
		return (
			<p className={classP}>{title}: {children}</p>
		)
	}
	else{
		return (
			<p>{children}</p>
		)
	}
}

export default Row
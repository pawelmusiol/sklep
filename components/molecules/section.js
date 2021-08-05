import { LoadingCircle } from "../atoms"

const Section = ({ title, children, className, ready, style }) => {
	if (ready === undefined) {
		return (
			<div className={className} style={style}>
				{title && <h1>{title}</h1>}
				{children}
			</div>
		)
	}
	return (
		<>
			{ready
				?
				<div className={className} style={style}>
					{title && <h1>{title}</h1>}
					{children}
				</div>
				:
				<LoadingCircle />
			}
		</>
	)
}

export default Section
import Link from "next/link"

const LandingBlock = ({ children, title, image, gridArea, href }) => {

	const to = href || "#"

	return (
		<div className="landing-block" style={{ gridArea: gridArea }} >
			<Link href={to}>
				<div className="landing-block-content">
					<h2>{title}</h2>
					<div className="landing-block-children">
						{children}
					</div>
				</div>
			</Link>
			<img src={image} />
		</div>
	)
}

export default LandingBlock
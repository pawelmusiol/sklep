import Link from 'next/link'

const ALink = ({ to, className, onClick, children, onMouseEnter, onMouseLeave }) => {

	return (
		<>
			{to ?
				<Link href={to} >
					<a
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						onClick={onClick}
						className={className}>
						{children}
					</a>
				</Link>
				:
				<a
				style={{cursor: 'pointer'}}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onClick={onClick}
					className={className}>
					{children}
				</a>
			}
		</>

	)
}

export default ALink
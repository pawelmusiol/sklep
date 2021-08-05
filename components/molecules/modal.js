const Modal = ({ children, id, onExit, title }) => {

	return (
		<>

			<div className="modal-back" id={id}>
				<div className="modal-blur" />
				<div className="modal-front">
					<div className="modal-top">
						<h2>{title}</h2>
						<span
							className="cross"
							onClick={() => {
								if (onExit) {
									onExit()
								}
							}}>
							<img style={{ width: "16px" }} src="/icons/close.svg" />
						</span>
					</div>
					<div className="modal-content">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
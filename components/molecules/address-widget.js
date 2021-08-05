

const AddressWidget = ({ Address, onClick, change }) => {
	return (
		<div className="address-widget">
			<div onClick={onClick}>
				<div>
					<p>
						{Address.name}
					</p>
					{change &&
						<p className="change-data">Zmień</p>
					}
				</div>
				<div>
					<p>
						{Address.street}
					</p>
					<p>
						{Address.number}
					</p>
					{Address.flat &&
						<p>
							/
							{Address.flat}
						</p>
					}
				</div>
				<div>
					<p>
						{Address.postal}
					</p>
					<p>
						{Address.city}
					</p>
				</div>
				<div>
					<p>
						telefon:
					</p>
					<p>
						{Address.phone}
					</p>
				</div>
			</div>
		</div>
	)
}

export default AddressWidget
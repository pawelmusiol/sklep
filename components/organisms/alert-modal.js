import { useState } from 'react'
import { Modal } from "../molecules"

const AlertModal = ({ open }) => {

	const [Open, setOpen] = useState(open)

	return (
		<>
			{Open &&
				<Modal onExit={() => setOpen(false)} id="user-alert-modal">
					<p>
						Zaloguj się dzbanie
					</p>
				</Modal>
			}
		</>
	)
}

export default AlertModal
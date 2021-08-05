import { Button } from "../atoms"

const LoginButton = ({ children, onClick, className }) => {
	let ButtonClass = "login-button "
	
	if (className) ButtonClass += className

	return (
		<>
			<Button onClick={onClick} className={ButtonClass}>{children}</Button>
		</>
	)
}

export default LoginButton
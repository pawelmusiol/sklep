import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../components/providers/user-provider"
import axios from "axios"

const useFetchUserData = () => {
	let UserContextData = useContext(UserContext)

	const [User, setUser] = useState({
		login: UserContextData.login,
		name: UserContextData.name
	})

	useEffect(() => {
		setUser({
			login: UserContextData.login,
			name: UserContextData.name
		})
	}, [, UserContextData])
	return User
}

const User = () => {

	let userData = useFetchUserData()

	return(
		<div className="content">
			<p>Witaj {userData.name}</p>
		</div>
	)
}

export default User
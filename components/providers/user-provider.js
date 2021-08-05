import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie"
import { useRouter } from "next/router";
import axios from "axios"
import { usePre } from "../helpers"
import { AlertModal } from "../organisms"

const defaultValues = {
	name: "",
	login: "",
	_id: "",
	token: ""
}



export const UserContext = React.createContext({ ...defaultValues, setUser: () => { } })

const useLogin = (setUser, setRedirect) => {
	const router = useRouter()
	const [cookies] = useCookies(['token'])
	let pre = usePre()
	useEffect(() => {
		setRedirect(false)
		if (document.cookie.indexOf('token') > -1) {
			axios.get(pre + 'api/user/login', {
				headers: {
					authorization: cookies.token
				}
			}).then((response) => {
				setUser({ ...response.data, token: cookies.token })
			})
		}
		else {
			if (router.pathname !== "/" && checkForAuth(router.pathname)) {
				router.push("/")
				setRedirect(true)
			}
			setUser(defaultValues)
		}
	}, [router.pathname])
}

const checkForAuth = ( /** @type {string} */ pathname) => {
	let toRet = false
	const links = ["error", "user"]

	for(let link of links) {
		if (pathname.search(link) !== -1) {
			toRet = true
			break
		}
	}
	return toRet
}

const UserProvider = ({ children }) => {
	const [User, setUser] = useState(defaultValues)
	const [Redirect, setRedirect] = useState(false)
	useLogin(setUser, setRedirect)

	return (
		<UserContext.Provider value={{ ...User, setUser }} >
			{Redirect && <AlertModal open={true}/>}
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
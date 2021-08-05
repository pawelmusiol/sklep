import { Modal, LoginButton, InputRow } from '../molecules'
import { UserContext } from '../providers'
import { useState, useContext, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

//Log into website
const LetMeIn = (data, userValues, id, setCookie) => {
	axios.post('/api/user/login', data).then((response) => {
		//wstawianie użytkownika do sesji
		userValues.setUser(response.data)
		setTokenCookie(response.data.token, setCookie)
		document.getElementById(id).style.display = "none"
	}).catch((error) => console.log(error))
}

const RegisterMe = (data) => {
	axios.post('/api/user/register', data).then((response) => {
		alert('uzytkownik zarejestrowany' + data.mail + " " + data.name)
	}).catch((error) => console.log(error))
}

//Setting Cookie with Token
const setTokenCookie = (token, setCookie) => {
	let date = new Date()
	let min = date.getMinutes() + 2
	date.setMinutes(min)
	setCookie('token', token, { expires: date })
	//document.cookie = "token=" + token + "; expires=" + date.toUTCString()
}

const LoginModal = ({ open, setOpen }) => {
	const [Register, setRegister] = useState(false)
	const [Mail, setMail] = useState("")
	const [Password, setPassword] = useState("")
	const [Name, setName] = useState("")
	const UserValues = useContext(UserContext)
	const [cookie, setCookie] = useCookies(['token'])

	useEffect(() => {
		setRegister(open.register)
	}, [open])

	if (open.open) {
		return (
			<Modal id="login-modal" onExit={() => { setRegister(false); setOpen({ open: false, register: false }) }} title={Register ? "Zarejestruj się" : "Zaloguj się"}>
				{/* future log in via facebook and google
			<div>
				<img src="icons/google.png" />
				<div class="fb-login-button" data-width="" 
				data-size="large" 
				data-button-type="login_with" 
				data-layout="default" 
				data-auto-logout-link="false" 
				data-use-continue-as="false"></div>
			</div>
			*/}
				<div className="login-modal-content">

					<InputRow
						name="mail"
						value={Mail}
						setValue={setMail}
						type="mail"
					>
						Mail
			</InputRow>
					<InputRow
						name="password"
						value={Password}
						setValue={setPassword}
						type="password"
					>
						Hasło
			</InputRow>
					{Register &&
						<InputRow
							name="name"
							value={Name}
							setValue={setName}
							type="text">
							Imię
				</InputRow>
					}

					{Register ?
						<LoginButton onClick={() => RegisterMe({ mail: Mail, password: Password, name: Name })}>Zarejestruj się</LoginButton>
						:
						<>
							<LoginButton onClick={() => LetMeIn({ mail: Mail, password: Password }, UserValues, "login-modal", setCookie)}>Zaloguj się</LoginButton>
							<LoginButton onClick={() => setRegister(true)}>Nie masz konta?</LoginButton>
						</>
					}
				</div>
			</Modal>
		)
	}
	else {
		return <></>
	}
}

export default LoginModal
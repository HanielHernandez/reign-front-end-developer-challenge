import { FC } from 'react'
import logo from '../assets/logo.png'
const TheNavbar: FC = () => {
	return (
		<nav>
			<img className="logo" src={logo} alt="logo" />
		</nav>
	)
}

export default TheNavbar

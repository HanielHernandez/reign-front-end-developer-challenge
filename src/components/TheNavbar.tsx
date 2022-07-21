import { FC } from 'react'
import logo from '../assets/logo.png'
const TheNavbar: FC = () => {
	return (
		<nav>
			<div className="nav-container">
				<img className="logo" src={logo} alt="logo" />
			</div>
		</nav>
	)
}

export default TheNavbar

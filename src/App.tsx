import { useState } from 'react'
import TheNavbar from './components/TheNavbar'
import Tabs from './components/Tabs'
import './styles/main.scss'
import { Tab } from './models/tab'
import NewList from './components/NewsList'

function App() {
	const [count, setCount] = useState(0)
	const tabs: Tab[] = [
		{
			name: 'All',
			component: NewList
		},
		{
			name: 'My Faves',
			component: NewList
		}
	]
	return (
		<div className="App">
			<TheNavbar />
			<div className="container">
				<Tabs defaultActiveTab="All" tabs={tabs} />
			</div>
		</div>
	)
}

export default App

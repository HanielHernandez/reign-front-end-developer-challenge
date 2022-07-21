import TheNavbar from './components/TheNavbar'
import Tabs from './components/Tabs'
import './styles/main.scss'
import { Tab } from './models/tab'
import NewList from './components/NewsList'

function App() {
	const tabs: Tab[] = [
		{
			name: 'All',
			onRender: () => <NewList mode="all" />
		},
		{
			name: 'My Faves',
			onRender: () => <NewList mode="favs" />
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

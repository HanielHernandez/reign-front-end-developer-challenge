import { useState } from 'react'
import TheNavbar from './components/TheNavbar'
import Tabs from './components/Tabs'
import './styles/main.scss'
import { Tab } from './models/tab'

function App() {
  const [count, setCount] = useState(0)
  const tabs: Tab[] = [{
    name: "All",
    component: ()=>(<></>)
  }]
  return (
    <div className="App">
      <TheNavbar></TheNavbar>

        <Tabs tabs={tabs}></Tabs>


    </div>
  )
}

export default App

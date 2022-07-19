import { useState } from "react";
import TheNavbar from "./components/TheNavbar";
import Tabs from "./components/Tabs";
import "./styles/main.scss";
import { Tab } from "./models/tab";

function App() {
  const [count, setCount] = useState(0);
  const tabs: Tab[] = [
    {
      name: "All",
      component: () => <></>,
    },
    {
      name: "My faves",
      component: () => <></>,
    },
  ];
  return (
    <div className="App">
      <TheNavbar></TheNavbar>
      <div className="container">
        <Tabs tabs={tabs}></Tabs>
      </div>
    </div>
  );
}

export default App;

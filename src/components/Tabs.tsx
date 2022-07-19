import { FunctionComponent } from "react";
import { Tab } from "../models/tab";

interface Props {
  tabs:Tab[]
}
 
const Tabs: FunctionComponent<Props> = ({tabs}) => {
  return (

    <div className="tabs">
      {
        tabs.map((tab)=>{
          return (
            <div className="tab">
              {tab.name}
            </div>
          )
        })
      }


    </div>
    );
}
 
export default Tabs;
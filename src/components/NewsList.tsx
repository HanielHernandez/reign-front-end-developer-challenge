import { FC, useState } from "react";
import { frameworkOptions } from "../constants";
import Select from "./select";

interface NewListProps {
  mode: string;
}
const NewsList: FC<NewListProps> = ({ mode }) => {

  const [selectedFramework,setSelectedFramework] = useState<any|null>()  


  const onRenderOption = (option: any) => {
    return <div className="select-menu-item" onClick={()=>setSelectedFramework(option)}>
      <img className="select-menu-item-icon" src={option.icon} alt={`${option.text} - logo}` } />
      <div>
        {option.text}
      </div>
    </div>;
  };

  return (
    <div>
      {mode == "all" && (
        <Select
          value={selectedFramework?.text  || ""}
          options={frameworkOptions}
          onRenderOptions={onRenderOption}
          placeholder="Select your news"
        />
      )}
      News List goes ehre
    </div>
  );
};
export default NewsList;

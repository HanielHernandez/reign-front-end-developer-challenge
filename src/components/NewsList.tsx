import { FC, useEffect, useState } from "react";
import { frameworkOptions } from "../constants";
import NewsService from "../utils/news-service";
import Select from "./select";

interface NewListProps {
  mode: string;
}
const NewsList: FC<NewListProps> = ({ mode }) => {

  const [selectedFramework,setSelectedFramework] = useState<any|null>()  


  


  const onRenderOption = (option: any) => {
    return <div className="select-menu-item" onClick={()=>setSelectedFramework(option.id)}>
      <img className="select-menu-item-icon" src={option.icon} alt={`${option.text} - logo}` } />
      <div>
        {option.text}
      </div>
    </div>;
  };

  const fetchNews = async ()=>{
    try{
      const response = await NewsService.index({
        page:0,
      })
      console.log("RESPONSE",response)
    }catch(e){
      console.error(e)
    }

  }

  useEffect(()=>{
    
  },[])
 
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

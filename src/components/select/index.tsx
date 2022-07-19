import { FC, ReactNode } from "react"

interface SelectProps {
  placeholder: "",
  options: any[],
  onRenderOptions: (item:any)=>ReactNode
}

export const Select: FC = ()=>{
  return <div className="select-container">
    <input type="text" className="select-input" />
    <div className="select-menu">

    </div>

  </div>
}
export default Select;
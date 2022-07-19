import { FC } from "react";
import { SelectOption } from "../../models/select-option";

export interface SelectItemProps {
  option: SelectOption;
  onClick: () => void;
}
export const SelectItem: FC<SelectItemProps> = ({ onClick, option }) => {
  return (
    <div className="select-menu-item" onClick={() => onClick()}>
      <img
        className="select-menu-item-icon"
        src={option.icon}
        alt={`${option.text} - logo}`}
      />
      <div>{option.text}</div>
    </div>
  );
};
export default SelectItem;

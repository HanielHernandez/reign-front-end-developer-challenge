import { FC, ReactNode, useMemo, useState } from "react";
import { SelectOption } from "../../models/select-option";
import SelectItem from "./SelectItem";

interface SelectProps {
  placeholder: string;
  options: any[];
  value: string;
  onChange: (item: SelectOption) => void;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOnOptionClick = (option: SelectOption) => {
    setIsMenuOpen(false);
    onChange(option);
  };

  return (
    <div className="select-container">
      <input
        type="text"
        value={value}
        className="select-input"
        readOnly
        onFocus={() => setIsMenuOpen(true)}
        placeholder={placeholder}
      />

      {isMenuOpen && (
        <>
          <div className="select-menu">
            {options.map((option) => {
              return (
                <SelectItem
                  option={option}
                  onClick={() => handleOnOptionClick(option)}
                />
              );
            })}
          </div>
          <div
            className="select-cover"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </>
      )}
    </div>
  );
};
export default Select;

import { FC, ReactNode, useMemo, useState } from "react";
import { SelectOption } from "../../models/select-option";
import SelectItem from "./select-item";

interface SelectProps {
  placeholder: string;
  options: any[];
  value: string;
  onChange: (item: SelectOption) => void;
  hide?: boolean;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  hide,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOnOptionClick = (option: SelectOption) => {
    setIsMenuOpen(false);
    onChange(option);
  };

  return (
    <div className={`select-container ${hide ? "hidden" : ""}`}>
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

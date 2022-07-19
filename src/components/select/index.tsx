import { FC, ReactNode, useMemo, useState } from "react";

interface SelectProps {
  placeholder: string;
  options: any[];
  value: string;
  onRenderOptions: (item: any) => ReactNode;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onRenderOptions,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              return onRenderOptions(option);
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

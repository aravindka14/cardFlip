import React from "react";
import CreatableSelect from "react-select/creatable";

// const components = {
//   DropdownIndicator: null,
// };
const BASIC_INPUT_CLS = `w-full rounded-lg border bg-white px-4 py-2.5 mt-1 text-sm text-gray-800 shadow-sm transition-all duration-200 
placeholder:text-gray-400 focus:outline-none focus:ring-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:ring-gray-200`;

const MultiSelect = ({ value, onChange, placeholder }) => {
  return (
    <CreatableSelect
      isMulti
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      classNames={{
        control: () =>
          "rounded-lg border border-gray-200 min-h-[42px] shadow-sm hover:border-gray-300",
        valueContainer: () => "px-2 py-1",
        input: () => "text-sm",
        placeholder: () => "text-gray-400",
        menu: () => "z-50",
      }}
    />
  );
};

export default MultiSelect;

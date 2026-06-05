import React from "react";
import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "42px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#9ca3af" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px #e5e7eb" : "none",
    padding: "2px 6px",
    fontSize: "14px",
    "&:hover": {
      borderColor: "#d1d5db",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 6px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),

  multiValue: (provided) => ({
    ...provided,
    borderRadius: "6px",
    backgroundColor: "#eef2ff",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "#4338ca",
    fontWeight: 500,
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    overflow: "hidden",
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
    color: "#111827",
    cursor: "pointer",
  }),
};

const MultiSelect = ({ value, onChange, placeholder }) => {
  return (
    <CreatableSelect
      isMulti
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
      components={{
        DropdownIndicator: null,
        IndicatorSeparator: null,
      }}
      isClearable
      menuIsOpen={false}
    />
  );
};

export default MultiSelect;

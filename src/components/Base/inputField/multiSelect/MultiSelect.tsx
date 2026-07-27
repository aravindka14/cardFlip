import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (provided: any, state: { isFocused: any }) => ({
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

  valueContainer: (provided: any) => ({
    ...provided,
    padding: "2px 6px",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "6px",
    backgroundColor: "#eef2ff",
  }),

  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#4338ca",
    fontWeight: 500,
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    cursor: "pointer",
  }),

  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    overflow: "hidden",
    zIndex: 9999,
  }),

  option: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
    color: "#111827",
    cursor: "pointer",
  }),
};

type OptionType = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  value: OptionType[];
  onChange: (value: readonly OptionType[]) => void;
  placeholder: string;
}

const MultiSelect = ({ value, onChange, placeholder }: MultiSelectProps) => {
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

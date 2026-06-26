import React, { useState } from "react";
import FontIcon from "../icons/FontIcon.js";
import CreatableSelect from "react-select/creatable";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  error?: string;
  options?: Array<{ value: string; label: string; color?: string }>;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (...event: any[]) => void;
  onRemoveFile?: (index: number) => void;
  selectedFile?: FileList | null;
  previewFile?: (index: number) => void;
  required?: boolean;
  selectedIndex?: number;
  icon?: React.ElementType;
  accept?: string[];
  className?: string;
  text?: string;
  onBlur?: (e: any) => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "48px",
    borderRadius: "0.75rem",
    backgroundColor: "rgba(248, 250, 252, 0.5)",
    borderColor: state.isFocused
      ? "#6366f1"
      : state.selectProps.error
        ? "#f87171"
        : "#e2e8f0",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99, 102, 241, 0.2)" : "none",
    padding: "2px 6px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: state.isFocused ? "#6366f1" : "#cbd5e1",
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
    borderRadius: "0.75rem",
    overflow: "hidden",
    zIndex: 9999,
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
    color: "#111827",
    cursor: "pointer",
  }),
};

const BASIC_INPUT_CLS = `w-full rounded-xl border bg-slate-50/50 mt-1 text-sm text-slate-800 transition-all duration-300 
placeholder:text-slate-400/80 focus:outline-none focus:ring-2`;

const InputField = React.forwardRef<any, InputFieldProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      value,
      error,
      options = [],
      disabled = false,
      multiple = false,
      onChange,
      onRemoveFile,
      selectedFile,
      previewFile,
      required,
      selectedIndex,
      icon: Icon,
      accept,
      ...rest
    }: InputFieldProps,
    ref,
  ): React.JSX.Element => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [multiInputValue, setMultiInputValue] = useState("");
    const selected = options.find((opt) => opt.value === value);
    const acceptString = accept
      ?.map((type) => {
        const subType = type.split("/")[1];
        return subType ? `.${subType.toLocaleUpperCase()}` : type;
      })
      .join(", ");

    return (
      <div className="w-full space-y-1.5 ">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ms-1">
            {label}
          </label>
        )}

        <div className="relative">
          {type === "dropdown" ? (
            <div className="relative w-full">
              <div
                onClick={() => setOpen(!open)}
                className={`${BASIC_INPUT_CLS} border-slate-200 hover:border-slate-300 px-4 py-3 flex items-center justify-between cursor-pointer ${rest?.className || ""}`}
              >
                {selected ? (
                  <div className="flex items-center gap-2">
                    {selected?.color && (
                      <span
                        className={`w-3 h-3 rounded-full ${selected?.color}`}
                      />
                    )}
                    <span>{selected.label}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">{placeholder}</span>
                )}
              </div>

              {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md ">
                  {options.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onChange?.(opt.value);
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 rounded-lg"
                    >
                      {opt?.color && (
                        <span
                          className={`w-3 h-3 rounded-full ${opt?.color}`}
                        />
                      )}
                      <div className="text-sm">{opt.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : type === "file" ? (
            <>
              <div
                className={`relative w-full rounded-xl border-2 border-slate-200 border-dashed p-6 flex flex-col items-center justify-center gap-3 mt-1 hover:border-slate-300 transition-colors`}
              >
                <input
                  id={name}
                  type="file"
                  name={name}
                  onChange={onChange}
                  multiple={multiple}
                  accept={accept?.join(",")}
                  ref={ref}
                  disabled={disabled}
                  className="hidden"
                  {...rest}
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
                  <FontIcon
                    iconName={"uploadCloud"}
                    color="#6366f1"
                    size="24px"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline focus:outline-none focus:underline"
                      onClick={() => document.getElementById(name ?? "")?.click()}
                    >
                      Click to upload
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{acceptString}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {selectedFile &&
                  selectedFile.length > 0 &&
                  Array.from(selectedFile).map((file, index) => (
                    <div
                      onClick={() => {
                        previewFile?.(index);
                      }}
                      key={index}
                      className={`flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm
                        ${selectedIndex === index ? "border-indigo-600 shadow-md" : "border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            selectedIndex === index
                              ? "bg-[#6366f1]"
                              : "bg-[#eef2ff]"
                          }`}
                        >
                          <FontIcon
                            iconName={"file"}
                            color={
                              selectedIndex === index ? "#eef2ff" : "#6366f1"
                            }
                            size="24px"
                          />
                        </div>

                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {file?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file?.size / 1024 / 1024 < 1
                              ? (file?.size / 1024).toFixed(2) + " KB"
                              : (file?.size / (1024 * 1024)).toFixed(2) + " MB"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile?.(index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none"
                      >
                        <FontIcon iconName={"trash"} color="red" size="15" />
                      </button>
                    </div>
                  ))}
              </div>
            </>
          ) : type === "checkbox" ? (
            <label
              className={`flex items-center gap-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 text-gray-700
                ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
                ${rest?.className}
              `}
            >
              <input
                type="checkbox"
                name={name}
                checked={!!value}
                onChange={() => onChange?.(!value)}
                disabled={disabled}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors
                ${value ? "border-indigo-500 bg-indigo-500" : "border-gray-300"}`}
              >
                {value && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium">{rest.text}</span>
            </label>
          ) : type === "textarea" ? (
            <textarea
              name={name}
              ref={ref}
              placeholder={placeholder}
              onChange={onChange}
              {...rest}
              className={`${BASIC_INPUT_CLS} ${error ? "border-red-400 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500"} px-4 py-3 ${rest.className || ""}`}
            />
          ) : type === "multiSelect" ? (
            <div>
              <CreatableSelect
                isMulti
                name={name}
                ref={ref}
                value={(value || []).map((v: any) => ({ label: v, value: v }))}
                onChange={(newOptions) => {
                  const options =
                    (newOptions as { value: string; label: string }[]) ?? [];
                  onChange?.(options.map((opt) => opt.value));
                }}
                onBlur={rest.onBlur}
                inputValue={multiInputValue}
                onInputChange={(newVal) => setMultiInputValue(newVal)}
                onKeyDown={(e: KeyboardEvent) => {
                  if (!multiInputValue) return;
                  if (e.key === "Enter" || e.key === "Tab") {
                    e.preventDefault();
                    // prevent duplicate tags
                    const exists = (value || []).includes(multiInputValue);
                    if (!exists) {
                      onChange?.(
                        value ? [...value, multiInputValue] : [multiInputValue],
                      );
                    }
                    setMultiInputValue("");
                  }
                }}
                placeholder={placeholder}
                styles={customStyles}
                {...({ error } as any)}
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
                isClearable
                menuIsOpen={false}
              />
            </div>
          ) : (
            <div className="relative group">
              {Icon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                  <Icon size={18} />
                </div>
              )}
              <input
                name={name}
                ref={ref}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                {...rest}
                className={`${BASIC_INPUT_CLS} ${error ? "border-red-400 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500"} ${Icon ? "pl-11" : "pl-4"} ${type === "password" ? "pr-11" : "pr-4"} py-3 ${rest.className || ""}`}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-red-500 ms-1 flex items-center gap-1 font-medium">
          {error && <>{error}</>}
        </p>
      </div>
    );
  },
);

export default InputField;

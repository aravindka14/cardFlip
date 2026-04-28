import React from "react";
import { useState } from "react";
const InputField = React.forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      error = "",
      options = [],
      disabled = false,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const selected = options.find((opt) => opt.value === value);
    return (
      <div className="w-full space-y-1.5 mt-5">
        {label && (
          <label className="text-sm font-medium text-gray-600 ms-1">
            {label}
          </label>
        )}

        <div className="relative">
          {type === "dropdown" ? (
            <div className="relative w-full">
              <div
                onClick={() => setOpen(!open)}
                className="w-full rounded-lg border bg-white px-4 py-2.5 mt-1 text-sm text-gray-800 shadow-sm transition-all 
              duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:ring-gray-200"
              >
                {selected ? (
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${selected?.color}`} />
                    <span>{selected.label}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </div>

              {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md ">
                  {options.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 rounded-lg"
                    >
                      <span className={`w-3 h-3 rounded-full ${opt?.color}`} />
                      <div>
                        <div className="text-sm">{opt.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <input
              ref={ref}
              type={type}
              placeholder={placeholder}
              {...rest}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 mt-1 text-sm text-gray-800 shadow-sm transition-all 
              duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:ring-gray-200`}
            />
          )}
        </div>
        <p className="text-xs text-red-500 ms-1">{error}</p>
      </div>
    );
  },
);

export default InputField;

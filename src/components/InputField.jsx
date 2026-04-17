import React from "react";

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
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1.5 mt-5">
        {label && (
          <label className="text-sm font-medium text-gray-600 ms-1">
            {label}
          </label>
        )}

        <div className="relative">
          {type === "dropdown" ? (
            <select
              {...rest}
              disabled={disabled}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 mt-1 text-sm text-gray-800 shadow-sm transition-all 
                  duration-200 focus:outline-none focus:ring-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:ring-gray-200 `}
            >
              <option hidden value="">
                {placeholder}
              </option>
              {options.length > 0 ? (
                options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              ) : (
                <option disabled value="">No options</option>
              )}
            </select>
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

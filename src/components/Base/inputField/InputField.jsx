import React from "react";
import { useState } from "react";
import FontIcon from "../icons/FontIcon";

const InputField = React.forwardRef(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      value,
      error = "",
      options = [],
      disabled = false,
      onChange,
      onRemoveFile,
      selectedFile,
      previewFile,
      selectedIndex,
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
                    <span
                      className={`w-3 h-3 rounded-full ${selected?.color}`}
                    />
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
          ) : type === "file" ? (
            <>
              <div
                className={`relative w-full rounded-xl border-2 border-gray-300 border-dashed p-6 flex flex-col items-center justify-center gap-3`}
              >
                <input
                  id={name}
                  type="file"
                  name={name}
                  onChange={onChange}
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
                      onClick={() => document.getElementById(name).click()}
                    >
                      Click to upload
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    SVG, PNG, JPG or GIF (max. 10MB)
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {selectedFile &&
                  selectedFile.length > 0 &&
                  Array.from(selectedFile).map((file, index) => (
                    <div
                      onClick={() => {
                        previewFile(index);
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
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size / 1024 / 1024 < 1
                              ? (file.size / 1024).toFixed(2) + " KB"
                              : (file.size / (1024 * 1024)).toFixed(2) + " MB"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none"
                      >
                        <FontIcon iconName={"trash"} color="red" size="15" />
                      </button>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <input
              name={name}
              ref={ref}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
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

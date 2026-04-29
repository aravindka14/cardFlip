import React, { useState, useRef, useImperativeHandle } from "react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

const FileUpload = React.forwardRef(
  (
    { label, error, onChange, onBlur, name, accept, multiple = false, ...rest },
    ref,
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const inputRef = useRef(null);

    // Forward the ref to the native input element
    useImperativeHandle(ref, () => inputRef.current);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleChange = (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    };

    const handleFiles = (files) => {
      const filesArray = Array.from(files);
      const newFiles = multiple
        ? [...selectedFiles, ...filesArray]
        : [filesArray[0]];
      setSelectedFiles(newFiles);
      updateNativeInput(newFiles);
    };

    const removeFile = (indexToRemove) => {
      const newFiles = selectedFiles.filter(
        (_, index) => index !== indexToRemove,
      );
      setSelectedFiles(newFiles);
      updateNativeInput(newFiles);
    };

    const updateNativeInput = (filesArray) => {
      const dataTransfer = new DataTransfer();
      filesArray.forEach((f) => dataTransfer.items.add(f));

      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
        // Dispatching change event is crucial for react-hook-form to register the value change
        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
        if (onChange) onChange(event);
      }
    };

    const onButtonClick = () => {
      inputRef.current.click();
    };

    return (
      <div className="w-full space-y-1.5 mt-5">
        {label && (
          <label className="text-sm font-medium text-gray-700 ms-1">
            {label}
          </label>
        )}
        <div
          className={`relative w-full rounded-xl border-2 border-dashed p-6 transition-all duration-200 ease-in-out flex flex-col items-center justify-center gap-3
            ${dragActive ? "border-indigo-500 bg-indigo-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"}
            ${error ? "border-red-400 bg-red-50" : ""}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            onBlur={onBlur}
            className="hidden"
            {...rest}
          />
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
            <FiUploadCloud className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <button
                type="button"
                className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline focus:outline-none focus:underline"
                onClick={onButtonClick}
              >
                Click to upload
              </button>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG or GIF (max. 10MB)
            </p>
          </div>
        </div>

        {/* File Preview List */}
        {selectedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
                    <FiFile className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-500 ms-1">{error}</p>}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export default FileUpload;

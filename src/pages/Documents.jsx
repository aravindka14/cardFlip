import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

const selectFile = (e) => {
  const files = Array.from(e.target.files);
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "image/gif",
  ];
  const maxSize = 10 * 1024 * 1024; 
  const validFiles = [];
  const invalidFiles = [];
  files.forEach((file) => {
    const isValidType = allowedTypes.includes(file.type);
    const isValidSize = file.size <= maxSize;

    if (isValidType && isValidSize) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });
  if (invalidFiles.length > 0) {
    alert("Only PNG, JPG, JPEG, SVG, GIF files under 10MB are allowed.");
  }
  if (validFiles.length === 0) {
    e.target.value = null;
    return;
  }

  const urls = files.map((file) => URL.createObjectURL(file));
  setPreviewUrl((prev) => [...prev, ...urls]);
  setSelectedFiles((prev) => [...prev, ...files]);
  setSelectedIndex(previewUrl?.length);
  e.target.value = null;
};

const removeFile = (index) => {
  setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  setPreviewUrl((prev) => prev.filter((_, i) => i !== index));
  setSelectedIndex((prev) => {
    if (prev === index) return previewUrl.length > 1 ? 0 : -1;
    if (prev > index) return prev - 1;
    return prev;
  });
};

const previewFile = (index) => setSelectedIndex(index); 

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <InputField
        type="file"
        name="file"
        multiple
        onChange={selectFile}
        onRemoveFile={removeFile}
        selectedFile={selectedFiles}
        previewFile={previewFile}
        selectedIndex={selectedIndex}
        accept=".png,.jpg,.jpeg,.svg,.gif"
      />
      <div className="col-span-2 border border-gray-200 rounded-lg h-[calc(100vh-136px)] bg-gray-100 p-4 flex items-center justify-center">
        {previewUrl[selectedIndex] ? (
          <img
            src={previewUrl[selectedIndex]}
            alt="preview"
            className={`w-full h-full object-contain rounded-lg shadow-sm border border-gray-200`}
          />
        ) : (
          <div className="text-gray-400 text-sm">
            No Preview
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;

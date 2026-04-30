import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

const selectFile = (e) => {
  const files = Array.from(e.target.files);
  const urls = files.map((file) => URL.createObjectURL(file));
  setPreviewUrl((prev) => [...prev, ...urls]);
  setSelectedFiles((prev) => [...prev, ...files]);
  const length = previewUrl.length;
  setSelectedIndex(length);
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
      />
      <div className="col-span-2 border border-gray-200 rounded-lg h-[calc(100vh-136px)] bg-gray-100 p-4 flex items-center justify-center">
        {previewUrl[selectedIndex] && (
          <img
            src={previewUrl[selectedIndex]}
            alt="preview"
            className={`w-full h-full object-contain rounded-lg shadow-sm border border-gray-200`}
          />
        )}
      </div>
    </div>
  );
};

export default Documents;

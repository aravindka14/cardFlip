import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";
import useFileUpload from "../hooks/useFileUpload";
import FontIcon from "../components/Base/icons/FontIcon";

const allowedFiles = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/gif",
];
// const acceptString = allowedFiles.map((type) => `.${type.split("/")[1].toLocaleUpperCase()}`).join(", ");

const Documents = () => {
  const [checked, setChecked] = useState(false);
  const {
    selectFile,
    removeFile,
    previewFile,
    selectedFiles,
    previewUrl,
    selectedIndex,
  } = useFileUpload({
    allowedTypes: allowedFiles,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="flex flex-col justify-between">
        <InputField
          type="file"
          name="file"
          multiple
          onChange={selectFile}
          onRemoveFile={removeFile}
          selectedFile={selectedFiles}
          previewFile={previewFile}
          selectedIndex={selectedIndex}
          accept={allowedFiles}
        />
        <InputField
          type="checkbox"
          name="agree"
          text="I have read and agree to the terms of service"
          value={checked}
          onChange={(val) => setChecked(val)} 
        />
      </div>
      
      <div className="col-span-2 border border-gray-200 rounded-lg h-[calc(100vh-136px)] bg-gray-100 p-4 flex items-center justify-center">
        {previewUrl[selectedIndex] ? (
          <img
            src={previewUrl[selectedIndex]}
            alt="preview"
            className={`w-full h-full object-contain rounded-lg shadow-sm border border-gray-200`}
          />
        ) : (
          <div className="text-gray-400 text-sm flex flex-col items-center">
            <FontIcon iconName="ImageOn" size="100px" color="gray" /> Select an
            Image
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;

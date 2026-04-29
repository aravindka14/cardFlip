import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const selectFile = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrl((prev) => [...prev, ...urls]);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrl((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (selectedImage === prev[index]) {
        setSelectedImage(updated[0] || "");
      }
      return updated;
    });
  };

  const previewFile = (index) => {
    const url = previewUrl[index];
    setSelectedImage(url);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <InputField
        type="file"
        name="file"
        onChange={selectFile}
        onRemoveFile={removeFile}
        selectedFile={selectedFiles}
        previewFile={previewFile}
      />
      <div className="col-span-2 border border-gray-200 rounded-lg h-[calc(100vh-136px)] bg-gray-100 p-4 flex flex-wrap gap-4 content-start overflow-y-auto">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200"
          />
        )}
      </div>
    </div>
  );
};

export default Documents;

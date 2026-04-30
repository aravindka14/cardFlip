import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectFile = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrl((prev) => {
      const newUrls = [...prev, ...urls];
      if (prev.length === 0 && newUrls.length > 0) {
        setSelectedImage(newUrls[0]);
        setSelectedIndex(0);
      }
      return newUrls;
    });
    setSelectedFiles((prev) => [...prev, ...files]);
    e.target.value = null;
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrl((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (selectedIndex === index) {
        setSelectedImage(updated[0] || "");
        setSelectedIndex(updated.length > 0 ? 0 : -1);
      } else if (selectedIndex > index) {
        setSelectedIndex(selectedIndex - 1);
      }
      return updated;
    });
  };

  const previewFile = (index) => {
    setSelectedIndex(index);
    setSelectedImage(previewUrl[index]);
  };

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
        {selectedImage && (
          <img
            src={selectedImage}
            alt="preview"
            className={`w-full h-full object-contain rounded-lg shadow-sm border border-gray-200`}
          />
        )}
      </div>
    </div>
  );
};

export default Documents;

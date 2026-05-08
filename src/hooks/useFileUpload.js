import React, { useState } from "react";

const useFileUpload = ({
  allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "image/gif",
  ],
  maxSize = 10 * 1024 * 1024,
} = {}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectFile = (e) => {
    const files = Array.from(e.target.files);
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
      alert("Some files were rejected. Check type or size limits.");
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

  return {
    selectFile,
    removeFile,
    previewFile,
    selectedFiles,
    previewUrl,
    selectedIndex,
  };
};

export default useFileUpload;

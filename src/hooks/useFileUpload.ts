import React, { useState } from "react";

type AllowedType  = "image/png" | "image/jpeg" | "image/jpg" | "image/svg+xml" | "image/gif";

type UseFileUploadProps = { allowedTypes?:AllowedType[], maxSize?:number }

const useFileUpload = ({
  allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "image/gif",
  ],
  maxSize = 10 * 1024 * 1024,
} : UseFileUploadProps = {}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMultiple = e.target.multiple;
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];
    files.forEach((file) => {
      const isValidType = (allowedTypes as string[]).includes(file.type);
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
      e.target.value = "";
      return;
    }
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    if (isMultiple) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setPreviewUrl((prev) => [...prev, ...urls]);
      setSelectedIndex(selectedFiles.length);
    } else {
      setSelectedFiles(validFiles);
      setPreviewUrl(urls);
      setSelectedIndex(0);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrl((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex((prev) => {
      if (prev === index) return previewUrl.length > 1 ? 0 : -1;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const previewFile = (index: number) => setSelectedIndex(index);

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

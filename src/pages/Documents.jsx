import React, { useState } from "react";
import InputField from "../components/Base/inputField/InputField";
import useFileUpload from "../hooks/useFileUpload";
import FontIcon from "../components/Base/icons/FontIcon";
import { useForm } from "react-hook-form";

const allowedFiles = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/gif",
];

const Documents = () => {
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

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     issueDescription: "",
  //     agree: false,
  //   },
  // });

  // const onSubmit = (data) => {
  //   console.log(data);    
  // };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <form /* onSubmit={handleSubmit(onSubmit)} */ className="flex flex-col justify-between">
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
        {/* <InputField
          label="Briefly describe your issue"
          type="textarea"
          name="issueDescription"
          value={watch("issueDescription")}
          onChange={(e) => setValue("issueDescription", e.target.value)}/>

        <InputField
          type="checkbox"
          name="agree"
          text="I have read and agree to the terms of service"
          value={watch("agree")}
          onChange={(val) => setValue("agree", val)}
        />

        <button type="submit" >Submit</button> */}
      </form>

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

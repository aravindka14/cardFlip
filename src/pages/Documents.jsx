import React, { useState } from "react";
import FileUpload from "../components/Base/fileUpload/FileUpload";
import InputField from "../components/Base/inputField/InputField";
import { useForm } from "react-hook-form";

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="">
        <InputField
          type="file"
          {...register("file")}
          error={errors.file}
          onChange={(e) => {
            setSelectedFiles(e.target.files);
            register("file").onChange(e);
          }}
        />
      </div>
      <div className="col-span-2 border">right</div>
    </div>
  );
};

export default Documents;

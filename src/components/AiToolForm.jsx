import React from "react";
import InputField from "./Base/inputField/InputField";
import { aiToolsFormFields } from "../constants/aiToolFormData";
import { useForm } from "react-hook-form";

const AiToolForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="">
      {aiToolsFormFields?.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          {...register(field.name)}
        />
      ))}
    </div>
  );
};

export default AiToolForm;

import React from "react";
import InputField from "./Base/InputField";
import { aiToolsFormFields } from "../constants/aiToolFormData";
import { useForm } from "react-hook-form";

const AiToolForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {aiToolsFormFields?.map((field) =>(
        <InputField label="Tool Name" />
      ))}
    </div>
  );
};

export default AiToolForm;

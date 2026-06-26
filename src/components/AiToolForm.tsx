import { aiToolsFormFields } from "../constants/aiToolFormData.js";
import { Controller, type UseFormReturn } from "react-hook-form";
import InputField from "./Base/inputField/InputField.js";

interface AiToolFormProps {
  methods: UseFormReturn<any>;
}

const AiToolForm = ({ methods }: AiToolFormProps) => {
  const { register, control, formState } = methods;
  const { errors } = formState;
  return (
    <form className="m-2 mb-10">
      {aiToolsFormFields.map((field) => {
        if (field.type === "multiSelect") {
          return (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue={[]}
              render={({ field: controllerField }) => (
                <InputField
                  {...controllerField}
                  type="multiSelect"
                  label={field.label}
                  placeholder={field.placeholder}
                />
              )}
            />
          );
        }

        return (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name, {
              required: field.required ? field.required : false,
            })}
            error={errors[field.name]?.message?.toString()}
          />
        );
      })}
    </form>
  );
};

export default AiToolForm;

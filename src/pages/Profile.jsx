import React from "react";
import InputField from "../components/Base/inputField/InputField";
import { useForm } from "react-hook-form";
import useFileUpload from "../hooks/useFileUpload";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Profile = () => {
  const {
    selectFile,
    removeFile,
    previewFile,
    selectedFiles,
    previewUrl,
    selectedIndex,
  } = useFileUpload();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      designation: "",
      bio: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              label="Enter  First Name"
              placeholder="Enter your first name"
              type="text"
              {...register("firstName", { required: "First name is required" })}
              error={errors?.firstName?.message}
            />
            <InputField
              name="lastName"
              label="Enter Last name"
              placeholder="Enter your last name"
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              error={errors?.lastName?.message}
            />

            <InputField
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Enter your date of birth"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              error={errors?.dateOfBirth?.message}
            />

            <InputField
              name="age"
              label="Enter Age"
              placeholder="Enter your age"
              type="number"
              {...register("age", { required: "Age is required" })}
              error={errors?.age?.message}
            />

            <InputField
              type="dropdown"
              name="gender"
              label="Gender"
              options={genderOptions}
              placeholder="Select your gender"
              value={watch("gender")}
              onChange={(val) => {
                setValue("gender", val);
              }}
              error={errors?.gender?.message}
            />

            <InputField
              name="designation"
              label="Enter Designation"
              placeholder="Enter your designation"
              type="text"
              {...register("designation", {
                required: "Designation is required",
              })}
              error={errors?.designation?.message}
            />
          </div>

          <InputField
            type="textarea"
            name="bio"
            label="Bio"
            placeholder="Enter your bio"
            {...register("bio", { required: "Bio is required" })}
            error={errors?.bio?.message}
          />

          {/* <InputField/> */}
        </div>
        <div>
          <InputField
            type="file"
            name="file"
            label="Upload Photo"
            accept={["image/jpg", "image/jpeg", "image/png"]}
            {...register("file", { required: "File is required" })}
            onChange={selectFile}
            error={errors?.file?.message}
            previewFile={previewFile}
            previewUrl={previewUrl}
            // selectedFile={selectedFiles}
            // selectedIndex={selectedIndex}
            onRemoveFile={removeFile}
          />
          {previewUrl.length > 0 && (
            <div className="mt-3">
              <img
                src={previewUrl[selectedIndex]}
                alt="Preview"
                className="w-24 h-24"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 ">
        <button className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Profile;

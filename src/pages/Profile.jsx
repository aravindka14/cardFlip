import React, { useEffect } from "react";
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
    clearErrors,
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
      profile_pic: "",
      acknowledgement: ""
    },
  });

  useEffect(() => {
    register("gender", {
      required: "Gender is required",
    });
    register("profile_pic", {
      validate: () => selectedFiles.length > 0 || "Profile photo is required",
    });
  }, [register, selectedFiles]);

  const onSubmit = (data) => {
    if(!data.acknowledgement) return;
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("designation", data.designation);
    formData.append("bio", data.bio);
    formData.append("dateOfBirth", data.dateOfBirth);
    if (selectedFiles[0]) {
      formData.append("profile_pic", selectedFiles[0]);
    }
    console.log(...formData.entries());
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
              min={0}
              max={100}
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
                setValue("gender", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
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
        </div>
        <div>
          <InputField
            type="file"
            name="profile_pic"
            label="Upload Photo"
            accept={["image/jpg", "image/jpeg", "image/png"]}
            onChange={(e) => {
              (selectFile(e), clearErrors("profile_pic"));
            }}
            onRemoveFile={removeFile}
            selectedFile={selectedFiles}
            previewFile={previewFile}
            selectedIndex={selectedIndex}
            error={errors.profile_pic?.message}
          />
        </div>
        <div className="mt-5 flex justify-between items-center">
            <InputField
              type="checkbox"
              name="acknowledgement"
              text="I agree to the terms and conditions"
              checked={watch("acknowledgement")}
              onChange={(checked) => {
                setValue("acknowledgement", checked, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              value={watch("acknowledgement")}
            />
          <button disabled={!watch("acknowledgement")} className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;

import React from 'react'

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    //  <div className="w-full">
    //   {label && (
    //     <label className="block mb-1 text-sm font-medium text-gray-700">
    //       {label}
    //     </label>
    //   )}

    //   <input
    //     type={type}
    //     placeholder={placeholder}
    //     value={value}
    //     onChange={onChange}
    //     className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
    //   />
    // </div>
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium ms-2 text-gray-600">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full rounded-xl border border-gray-200 bg-white
            px-4 py-2.5 mt-1 text-sm text-gray-800
            shadow-sm
            transition-all duration-200

            placeholder:text-gray-400

            focus:border-gray-400 focus:ring-2 focus:ring-gray-200
            focus:outline-none

            hover:border-gray-300
          "
        />
      </div>
    </div>
  )
}

export default InputField
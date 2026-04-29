import React, { Children } from "react";
import { IoClose } from "react-icons/io5";

const Popup = ({ isOpen, onClose, onSubmit, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "w-[300px]",
    md: "w-[400px]",
    lg: "w-[600px]",
    xl: "w-[1000px]",
    xxl: "w-[1200px]",
    full: "w-[90vw] h-[90vh]",
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className={`relative bg-white rounded-lg shadow-lg z-10 flex flex-col ${sizeClasses[size]} max-h-[80vh] p-6`}
      >
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
        <div className="flex justify-end gap-3 bg-white rounded-lg">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
          >
            Close
          </button>

          <button
            onClick={onSubmit}
            className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

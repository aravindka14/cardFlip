import React, { Children } from "react";
import { IoClose } from "react-icons/io5";

const Popup = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[400px] z-10">
        <h1 className="text-2xl font-semibold">{title}</h1>

        {children}

        <div className="flex justify-end mt-8 gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-1 rounded-lg hover:bg-gray-200 transition-all duration-200 ease-in-out"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="border border-gray-300 px-4 py-1 rounded-lg bg-black text-white hover:bg-gray-700 transition-all duration-200 ease-in-out"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

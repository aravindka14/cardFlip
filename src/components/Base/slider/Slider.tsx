import React from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

interface SliderProps {
  children: React.ReactNode;
  showSlider: boolean;
  setShowSlider: (showSlider: boolean) => void;
  headline: string;
  size?: "small" | "medium" | "large";
  onClose?: () => void;
}

const Slider = ({
  children,
  showSlider,
  setShowSlider,
  headline,
  size = "small",
  onClose,
}: SliderProps) => {
  const handleClose = () => {
    onClose?.();
    setShowSlider(false);
  };

  const sizeClasses = {
    small: "w-full sm:w-[350px]",
    medium: "w-full sm:w-[450px]",
    large: "w-full sm:w-[550px]",
  };

  return (
    <div
      className={clsx("fixed inset-0 z-50 transition-all duration-300", {
        "pointer-events-auto bg-black/40": showSlider,
        "pointer-events-none bg-black/0": !showSlider,
      })}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Slider */}
      <div
        className={clsx(
          "absolute right-0 top-0 h-full bg-white shadow-2xl transition-transform duration-300 flex flex-col",
          sizeClasses[size],
          {
            "translate-x-0": showSlider,
            "translate-x-full": !showSlider,
          },
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-gray-200 border-b h-[87px]">
          <h2 className="text-xl font-semibold">{headline}</h2>

          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
};

export default Slider;

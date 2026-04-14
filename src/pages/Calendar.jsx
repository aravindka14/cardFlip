import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import YearCalendar from "../components/YearCalendar";
import Popup from "../components/Base/Popup";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";

const Calendar = () => {
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);
  const [holidayList, setHolidayList] = useState([{date: "2026-08-15", holiday: "independence day"}]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleHoliday = (data) => {
    console.log(data);
    setHolidayList([...holidayList, data]);
    setIsAddHolidayOpen(false);
    reset();
  };
  return (
    <>
      {isAddHolidayOpen && (
        <Popup
          title={"Add Holiday"}
          isOpen={isAddHolidayOpen}
          onClose={() => {
            setIsAddHolidayOpen(false);
            reset();
          }}
          onSubmit={handleSubmit(handleHoliday)}
        >
          <div className="mt-5">
            <InputField
              type="date"
              label="Date"
              {...register("date", { required: "Date is required" })}
            />
            <InputField
              type="text"
              label="Holiday Name"
              placeholder="Enter holiday name"
              error={errors?.holiday?.message}
              {...register("holiday", { required: "Holiday is required" })}
            />
          </div>
        </Popup>
      )}
      <div className="w-full flex">
        <div className="p-3 w-74 bg-gray-100 rounded-lg">
          <button
            onClick={() => setIsAddHolidayOpen(true)}
            className="w-full flex border bg-gray-800 rounded-lg justify-between px-2 py-1 text-lg text-white hover:bg-gray-700 hover:cursor-pointer transition-all duration-200 ease-in-out"
          >
            Add Holidays
            <div>
              {" "}
              <IoIosAddCircleOutline size={30} />
            </div>
          </button>
          <div className="bg-white h-full rounded-lg p-3 mt-5">
            {holidayList?.map((item, index) => (
              <h1 key={index} className="text-md font-bold">
                {item?.holiday}
              </h1>
            ))}
          </div>
        </div>
        <div className="flex-1 p-3">
          <YearCalendar />
        </div>
      </div>
    </>
  );
};

export default Calendar;

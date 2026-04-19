import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import YearCalendar from "../components/YearCalendar";
import Popup from "../components/Base/Popup";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { convertToISO } from "../utils/helper";
import useHolidayList from "../store/HolidayListStore";

const holidayTypeOptions = [
  { label: "Public Holiday", value: "1", color: "bg-red-400" },
  { label: "Optional Holiday", value: "2", color: "bg-yellow-500" },
  { label: "Religious Holiday", value: "3", color: "bg-green-500"}
]

const Calendar = () => {
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  // console.log("year", year);

  const holidayList = useHolidayList((state) => state.holidayList);
  const setHolidayList = useHolidayList((state) => state.setHolidayList);
  const deleteHolidayList = useHolidayList((state) => state.deleteHolidayList);

  const filteredHolidays = holidayList?.filter((list) =>
    list?.date?.includes(year),
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleHoliday = (data) => {
    const selectedType = holidayTypeOptions.find(
      (opt) => opt.value === data.holidayType
    );
    const newHoliday = {
      ...data,
      color: selectedType?.color,   
    };
    console.log(data);
    setHolidayList([...holidayList, newHoliday]);
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
              error={errors?.date?.message}
              {...register("date", { required: "Date is required" })}
            />
            <InputField
              type="text"
              label="Holiday Name"
              placeholder="Enter holiday name"
              error={errors?.holiday?.message}
              {...register("holiday", { required: "Holiday is required" })}
            />

            <InputField
              type="dropdown"
              label="Holiday Type"
              placeholder="Select holiday type"
              error={errors?.holidayType?.message}
              value={watch("holidayType")}
              onChange={(val) => setValue("holidayType", val)}
              options={holidayTypeOptions}
            />
          </div>
        </Popup>
      )}
      <div className="w-full grid lg:grid-cols-3 2xl:grid-cols-4">
        <div className="p-3 bg-gray-100 rounded-lg mt-[55px] ml-3">
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
          <div className="bg-white rounded-xl p-4 mt-5 shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Upcoming Holidays
            </h2>

            <div className="space-y-3">
              {filteredHolidays?.length > 0 ? (
                filteredHolidays?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-3"
                  >
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {item?.holiday}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {convertToISO(item?.date)}
                      </p>
                    </div>
                    <div onClick={()=> deleteHolidayList(item?.date)} className="text-gray-300 hover:text-red-400">
                      <FaRegTrashCan />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-3">
                  <div>
                    <h3 className="text-md font-semibold text-gray-400">
                      No holiday
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-3 lg:col-span-2 2xl:col-span-3">
          <YearCalendar holidays={holidayList} year={year} setYear={setYear} />
        </div>
      </div>
    </>
  );
};

export default Calendar;

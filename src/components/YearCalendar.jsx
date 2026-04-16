import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from "date-fns";

const YearCalendar = ({ holidays = [], year, setYear }) => {
  const presentDate = new Date();
  const formattedPresentDate = format(presentDate, "yyyy-MM-dd");
  console.log("present date", presentDate);

  // console.log("holiday list", holidays);

  const holidayMap = {};
  holidays.forEach((h) => {
    holidayMap[h.date] = h.holiday;
  });

  const renderMonth = (monthIndex) => {
    const currentDate = new Date(year, monthIndex);
    // console.log("currentDate",currentDate);

    const monthStart = startOfMonth(currentDate);
    // console.log("mot",monthStart);

    const monthEnd = endOfMonth(monthStart);

    const startDate = startOfWeek(monthStart);
    // console.log("startWeek",startDate);

    const endDate = endOfWeek(monthEnd);
    // console.log("end",endDate);

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isHoliday = holidayMap[formattedDate];

        days.push(
          <div className="relative group text-xs h-9 flex items-center justify-center">
            <div
              key={day}
              className={`text-xs h-9 p-1 flex items-center justify-center
                ${!isSameMonth(day, monthStart) && "invisible"}
                ${isHoliday && "bg-red-200 rounded-full px-3 cursor-pointer"}
                ${
                  format(day, "yyyy-MM-dd") === formattedPresentDate &&
                  "bg-blue-200 rounded-full px-3 cursor-pointer"
                }
              `}
            >
              {format(day, "d")}
            </div>
            {isHoliday && (
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap z-50">
                {isHoliday}
              </div>
            )}
          </div>,
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>,
      );
    }

    return (
      <div className="p-2 bg-white rounded shadow">
        <h3 className="text-center font-semibold mb-4">
          {format(currentDate, "MMMM")}
        </h3>

        <div className="grid grid-cols-7 text-xs text-center mb-1 font-semibold">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="border-b border-gray-300 mb-1"></div>

        {rows}
      </div>
    );
  };

  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(renderMonth(i));
  }

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-4 gap-2">
        <button
          onClick={() => setYear(year - 1)}
          className="px-3 py-1  rounded"
        >
          <FaArrowLeft size={20} />
        </button>

        <h2 className="text-lg font-bold">{year}</h2>

        <button onClick={() => setYear(year + 1)} className="px-3 py-1 rounded">
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {months}
      </div>
    </div>
  );
};

export default YearCalendar;

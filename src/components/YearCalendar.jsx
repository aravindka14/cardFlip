import React, { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
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

  console.log("holiday list", holidays);

  const holidayMap = {};
  holidays.forEach((h) => {
    holidayMap[h.date] = h;
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
        const holiday = holidayMap[formattedDate];
        const isHoliday = !!holiday;

        days.push(
          <div className="relative group text-xs h-9 flex items-center justify-center">
            <div
              key={day}
              className={`text-xs h-9 p-1 flex items-center justify-center min-w-[35px]
                ${!isSameMonth(day, monthStart) && "invisible"}
                ${isHoliday && `${holiday.color} rounded-full px-3 cursor-pointer`}
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
                {holiday.holiday}
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
        <h3 className="font-semibold mb-4 text-end px-4">
          {format(currentDate, "MMMM")}
        </h3>

        <div className="grid grid-cols-7 text-sm text-center mb-1 font-bold">
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
          <BiSolidLeftArrow  />
        </button>

        <h2 className="text-3xl font-semibold">{year}</h2>

        <button onClick={() => setYear(year + 1)} className="px-3 py-1 rounded">
          <BiSolidRightArrow  />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {months}
      </div>
    </div>
  );
};

export default YearCalendar;

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from "date-fns";

const YearCalendar = ({ holidays = [] }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const holidayMap = {};
  holidays.forEach((h) => {
    holidayMap[h.date] = h.name;
  });

  const renderMonth = (monthIndex) => {
    const currentDate = new Date(year, monthIndex);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);

    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isHoliday = holidayMap[formattedDate];

        days.push(
          <div
            key={day}
            className={`text-xs h-12 border p-1
              ${!isSameMonth(day, monthStart) ? "bg-gray-100" : ""}
              ${isHoliday ? "bg-red-200" : ""}
            `}
          >
            {format(day, "d")}
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
      <div className="border p-2 bg-white rounded shadow">
        <h3 className="text-center font-semibold mb-2">
          {format(currentDate, "MMMM")}
        </h3>

        <div className="grid grid-cols-7 text-xs text-center mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

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
      {/* Year Selector */}
      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={() => setYear(year - 1)}
          className="px-3 py-1 border rounded"
        >
          ◀
        </button>

        <h2 className="text-lg font-bold">{year}</h2>

        <button
          onClick={() => setYear(year + 1)}
          className="px-3 py-1 border rounded"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">{months}</div>
    </div>
  );
};

export default YearCalendar;

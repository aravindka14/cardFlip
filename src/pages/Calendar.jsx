import React from "react";
import YearCalendar from "../components/YearCalendar";

const Calendar = () => {
  return (
    <div className="w-full flex">
      <div className="p-3 w-64">
        <div>add holidays</div>
      </div>
      <div className="flex-1 p-3">
        <YearCalendar/>
      </div>
    </div>
  );
};

export default Calendar;

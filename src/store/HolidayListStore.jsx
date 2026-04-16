import { create } from "zustand";

const useHolidayList = create((set) => ({
  holidayList: [{ date: "2026-08-15", holiday: "Independence day" },],

  setHolidayList: (data) => set({ holidayList: data }),
  deleteHolidayList: (date) =>
    set((state) => ({
      holidayList: state.holidayList.filter((holiday) => holiday.date !== date),
    })),
}));

export default useHolidayList;

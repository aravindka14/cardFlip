import { create } from "zustand";

type HolidayListProps ={
  date:string;
  holiday:string;
  color:string;
  holidayType:string;
}

const useHolidayList = create((set) => ({
  holidayList: [
    {
      date: "2026-08-15",
      holiday: "Independence day",
      color: "bg-red-300",
      holidayType: "Public Holiday",
    },
    {
      date: "2026-04-02",
      holiday: "Maundy Thursday",
      color: "bg-yellow-300",
      holidayType: "Optional Holiday",
    },
    {
      date: "2026-03-20",
      holiday: "Ramzan",
      color: "bg-green-300",
      holidayType: "Religious Holiday",
    }
  ],

  setHolidayList: (data: HolidayListProps[]) => set({ holidayList: data }),
  deleteHolidayList: (date: string) =>
    set((state: { holidayList: HolidayListProps[] }) => ({
      holidayList: state.holidayList.filter((holiday) => holiday.date !== date),
    })),
}));

export default useHolidayList;

import { create } from "zustand";

const userStore= create((set) => {
    users: [],
    setUser = (userData) => set({users: userData})
})
export default userStore
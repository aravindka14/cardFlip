import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],

  setUsers: (usersData) => set({ users: usersData }),

  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
}));

export default useUserStore;

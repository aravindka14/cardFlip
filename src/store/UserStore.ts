import { create } from "zustand";

type UserProps = {
  id:number;
  name:string;
  email:string;
  phone:string;
  address:{
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo:{
      lat:string;
      lng:string;
    }
  };
  company: {
    name:string;
    catchPhrase:string;
    bs:string;
  };
  website:string;
  username:string[];
}

const useUserStore = create((set) => ({
  users: [],

  setUsers: (usersData:UserProps[]) => set({ users: usersData }),

  deleteUser: (id: number) =>
    set((state:{users:UserProps[]}) => ({ users: state.users.filter((user) => user.id !== id) })),
}));

export default useUserStore;

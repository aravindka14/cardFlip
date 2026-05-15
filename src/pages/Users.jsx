import React from "react";
import { useEffect, useState } from "react";
import Table from "../components/Base/table/Table";
import userStore from "../store/UserStore";
import { useGetUsers } from "../queries/users/useUserQueries";

const total = 10;
const Users = () => {
  const [page, setPage] = useState(1);
  const { data: data = [] } = useGetUsers({
    page,
    perPage: 5,
  });
  console.log("data set", data);

  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(total / 5);

  const setUsers = userStore((state) => state.setUsers);
  const userList = userStore((state) => state.users);
  const deleteUser = userStore((state) => state.deleteUser);

  useEffect(() => {
    if (data?.length) {
      setUsers(data);
    }
  }, [data]);

  const headers = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Company Name",
      accessorKey: "company.name",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.id)}
          className="text-red-500"
        >
          Delete
        </button>
      ),
    },
  ];

  const handleDelete = (id) => {
    deleteUser(id);
  };
  return (
    <div className="p-9">
      <div className="w-full flex justify-end">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 m-3 px-3 py-1 w-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          type="text"
        />
      </div>
      <Table
        data={userList}
        columns={headers}
        searchItem={search}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Users;

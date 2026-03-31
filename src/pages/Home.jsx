import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { data } from "../constants/InfoData";
import Table from "../components/Table";
import { useGetUsers } from "../queries/users/useUserQueries";
import { Outlet } from "react-router-dom";

const total = 10;

const Home = () => {
  const [page, setPage] = useState(1);
  const { data: userList = [] } = useGetUsers({
    page,
    perPage: 5,
  });
  console.log("data set", userList);

  const [dataSet, setDataSet] = useState(userList);
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(total / 5);

  useEffect(() => {
    if (userList?.length) {
      setDataSet(userList);
    }
  }, [userList]);

  const handleDelete = (id) => {
    setDataSet((prev) => prev.filter((item) => item.id !== id));
  };

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

  return (
    <>
      <div className="grid lg:grid-cols-3 place-items-center grid-cols-2 gap-8">
        {data.map((card) => (
          <Card
            key={card?.id}
            // title={card?.title}
            // subTitle={card?.subtitle}
            // tags={card?.tags}
            // description={card?.description}
            // features={card?.features}
            // footerTags={card?.footer}
            // detailedDesc={card?.detailedDescription}
            {...card}
          />
        ))}
      </div>

      <div className="my-10 p-8">
        <div className="w-full flex justify-end">
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border m-3 px-3 py-1 w-50 rounded"
            type="text"
          />
        </div>
        <Table
          data={dataSet}
          columns={headers}
          searchItem={search}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>

      {/* <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col flex-grow">
          <main className="flex-grow overflow-auto bg-[#FAFAFA]">
            <Outlet />
          </main>
        </div>
      </div> */}
    </>
  );
};

export default Home;

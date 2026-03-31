import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { data } from "../constants/InfoData";
import { useTableData } from "../queries/table/useTableData";
import Table from "../components/Table";

const Home = () => {
  const { useGetTableData } = useTableData();
  const { data: userList = [] } = useGetTableData();
  const [dataSet, setDataSet] = useState(userList?.data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userList?.data) {
      setDataSet(userList.data);
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
      <div className="h-40 w-full"></div>
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
        <Table data={dataSet} columns={headers} searchItem={search} />
      </div>
    </>
  );
};

export default Home;

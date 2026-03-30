import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import {data} from "../constants/InfoData"
import { useTableData } from "../queries/table/useTableData";
import DataTable from "./Table";

const Home = () => {
  const {useGetTableData} = useTableData();
  const { data: tableData = [] } = useGetTableData();
  const [dataSet, setDataSet] = useState(tableData?.data)

  useEffect(() => {
    if(tableData?.data){
      setDataSet(tableData.data)
    }
  },[tableData])
  

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
        ))
          }
      </div>

      <div className="my-10 p-8">
       <DataTable data={dataSet}/>
      </div>
    </>
  );
};

export default Home;

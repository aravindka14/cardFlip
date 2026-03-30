import React, { useState } from "react";
import Card from "../components/Card";
import {data} from "../constants/InfoData"

const Home = () => {
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
    </>
  );
};

export default Home;

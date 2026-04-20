import React from 'react'
import WorldMap from "react-svg-worldmap";

const WorldMaps = () => {
    const data = [
    { country: "IN", value: 100 },
    { country: "US", value: 200 },
    { country: "BR", value: 50 },
  ];
  return (
    <div className="w-full h-[500px]">
      <WorldMap
        color="blue"
        data={data}
        size="responsive"
      />
    </div>
  )
}

export default WorldMaps
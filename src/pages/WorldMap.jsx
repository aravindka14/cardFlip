import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import WorldMap from "react-svg-worldmap";

const WorldMaps = () => {
  const data = [
    { country: "IN", value: 100 },
    { country: "US", value: 200 },
    { country: "BR", value: 50 },
  ];

 const stylingFunction = (context) => {
  const value = context.countryValue || 0;

  // simple gradient logic
  let fillColor = "#d4d4d4"; // default (gray)

  if (value > 150) fillColor = "#000000";     // dark blue
  else if (value > 100) fillColor = "#292929"; // medium blue
  else if (value > 50) fillColor = "#242424";  // light blue

  return {
    fill: fillColor,
    stroke: "#524949",
    strokeWidth: 0.5,
    cursor: "pointer",
  };
};
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg bg-white overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent>
          <WorldMap
            size={1590}
            color="blue"
            data={data}
            color={"#060808"}
            tooltipBgColor={"#020205"}
            frameColor={"#ffffff"}
            tooltipBgColor={"white"}
            tooltipTextColor={"black"}
            styleFunction={stylingFunction}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default WorldMaps;

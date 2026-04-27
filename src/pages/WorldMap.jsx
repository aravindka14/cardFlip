import React, { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import WorldMap from "react-svg-worldmap";

const WorldMaps = () => {
  const data = [
    {
      country: "IN",
      value: 100,
      gdp: 3.7,
      population: 1428,
      gdpPerCapita: 2600,
    },
    {
      country: "US",
      value: 200,
      gdp: 28.0,
      population: 335,
      gdpPerCapita: 83000,
    },
    {
      country: "BR",
      value: 50,
      gdp: 2.2,
      population: 203,
      gdpPerCapita: 10800,
    },
  ];

  useEffect(() => {
    const removeTitle = () => {
      document.querySelectorAll("svg path title").forEach((el) => {
        el.remove(); 
      });
    };
    removeTitle();
    const observer = new MutationObserver(removeTitle);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const stylingFunction = (context) => {
    const value = context.countryValue || 0;
    let fillColor = "#d4d4d4";
    if (value) {
      fillColor = "#242424";
    }
    // if (value > 150)
    //   fillColor = "#000000";
    // else if (value > 100)
    //   fillColor = "#292929";
    // else if (value > 50) fillColor = "#242424";

    return {
      fill: fillColor,
      stroke: "#524949",
      strokeWidth: 0.5,
      cursor: "pointer",
      opacity: 1,
      outline: "none",
    };
  };
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-white overflow-hidden">
      <div className="absolute bottom-0 left-1 text-gray-400 m-2 z-100">scroll to zoom</div>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent>
          <WorldMap
            size={1290}
            color="blue"
            data={data}
            color={"#060808"}
            tooltipBgColor={"#020205"}
            frameColor={"#ffffff"}
            tooltipBgColor={"white"}
            tooltipTextColor={"black"}
            styleFunction={stylingFunction}
            tooltipTextFunction={(context) => {
              const countryData = data.find(
                (item) => item.country === context.countryCode,
              );
              if (!countryData) {
                return `${context.countryCode} - ${context.countryName}`;
              }
              return `
                ${context.countryName}
                GDP: $${countryData.gdp}T
                Population: ${countryData.population}M
                GDP per Capita: $${countryData.gdpPerCapita}
              `;
            }}
          />
        </TransformComponent>
      </TransformWrapper>
      
    </div>
  );
};

export default WorldMaps;

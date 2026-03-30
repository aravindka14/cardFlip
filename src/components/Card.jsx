import React, { useState } from "react";

const Card = ({
  title,
  subTitle,
  tags,
  description,
  features,
  footerTags,
  detailedDescription
}) => {

  const [flipCard, setFlipCard] = useState(false)
  return (
    <>
      {!flipCard? (
      <div onClick={() => setFlipCard(prev => !prev)} className="min-h-[430px] w-[320px] rounded-2xl border bg-black p-6 text-white shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-400">{subTitle}</p>
        </div>
  
        <div className="flex gap-2 mb-4">
          {tags?.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 text-xs rounded-md bg-gray-800"
            >
              {item}
            </div>
          ))}
        </div>
  
        <p className="text-sm text-gray-300 mb-4">
          {description}
        </p>
  
        <ul className="mb-4">
          {features.map((item, index) => (
            <li key={index} className="text-sm text-gray-300">
              <span>*{" "}{item}</span>
            </li>
          ))}
        </ul>
  
        <div className="border-t border-gray-700 my-4" />
  
        <p className="text-xs text-gray-500 mb-3">USE WITH RAILWAY</p>
  
        <div className="flex gap-2 mb-4 flex-wrap">
          {footerTags?.map((item, index) => (
            <div key={index} className="flex items-center px-3 py-1 text-xs rounded-md bg-gray-800">
            {item}
          </div>
          ))}
        </div>
      </div>
      ): (
        <div onClick={() => setFlipCard(prev => !prev)} className="min-h-[430px] w-[320px] rounded-2xl border bg-black p-6 text-white shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-400">{subTitle}</p>
        </div>
        <div>
          <p className="text-sm">{detailedDescription}</p>
        </div>

      </div>
      )
        
   }
    </>
  );
};

export default Card;

import React, { useState } from "react";
import { LuImageOff } from "react-icons/lu";


const PhotoCard = ({title , url }) => {
  const [error, setError] = useState(false);
  return (
    <div className="border min-h-[300px] w-[250px] rounded-lg bg-gray-100 border-gray-200 flex flex-col items-center p-4 gap-10">
      <p className="text-xl font-semibold text-center text-gray-600">{title}</p>
      {error ? (
        <LuImageOff size={40} />
      ) : (
        <img
          src={url}
          alt={<LuImageOff />}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default PhotoCard;

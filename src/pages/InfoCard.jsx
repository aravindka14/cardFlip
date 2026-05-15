import React, { useState } from "react";
import FlipCard from "../components/flip-card";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useGetAiTools } from "../queries/aiTools/useAiToolsQueries";
import Popup from "../components/Base/pop-up/Popup";
import AiToolForm from "../components/AiToolForm";

const InfoCard = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { data: aiToolsData } = useGetAiTools();

  return (
    <>
      <Popup size="xxl" isOpen={isOpenPopup} onClose={() => setIsOpenPopup(false)} title={"Add AI Tools"}><AiToolForm/></Popup>
      <div className="mt-8 px-12">
        <div className="flex justify-end items-center mb-6">
          <button onClick={() => setIsOpenPopup(true)} className="bg-black text-white flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Add AI Tools <IoMdAddCircleOutline size={25} color="white" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {aiToolsData?.map((card) => (
            <FlipCard key={card._id} rotate="y" {...card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoCard;

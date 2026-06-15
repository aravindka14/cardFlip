import React, { useState, useRef } from "react";
import FlipCard from "../components/flip-card";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAiToolsQueries } from "../queries/aiTools/useAiToolsQueries";
import Popup from "../components/Base/pop-up/Popup";
import AiToolForm from "../components/AiToolForm";
import Slider from "../components/Base/slider/Slider";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";

const InfoCard = () => {
  const { useGetAiTools, useAddAiTools, useDeleteAiTools } =
    useAiToolsQueries();

  const methods = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      tags: [],
      description: "",
      detailedDescription: "",
      features: [],
      footer: [],
    },
  });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { data: aiToolsData } = useGetAiTools();
  const { mutate: addAiTools } = useAddAiTools();
  const { mutate: deleteAiTool } = useDeleteAiTools();

  const onSubmit = async (data) => {
    let payload = {
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      description: data.description,
      detailedDescription: data.detailedDescription,
      features: data.features,
      footer: data.footer,
    };
    try {
      addAiTools({ data: payload });
      setIsOpenPopup(false);
      methods.reset();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this AI tool?")) {
      deleteAiTool(id);
    }
  };

  return (
    <>
      <Popup
        isOpen={isOpenPopup}
        onClose={() => {
          (setIsOpenPopup(false), methods.reset());
        }}
        primaryButtonText="Save"
        onSubmit={() => {
          methods.handleSubmit(onSubmit)();
        }}
        size="lg"
      >
        <AiToolForm methods={methods} />
      </Popup>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                AI Tools Collection
              </h1>
              <p className="text-gray-500 mt-2">
                Manage and showcase your favorite AI tools.
              </p>
            </div>

            <button
              onClick={() => setIsOpenPopup(true)}
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <IoMdAddCircleOutline size={24} />
              Add AI Tool
            </button>
          </div>

          {aiToolsData?.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                No AI Tools Added Yet
              </h3>
              <p className="text-gray-500 mt-2">
                Click the button above to create your first tool.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {aiToolsData?.map((card) => (
                <div
                  key={card._id}
                  className="relative group transform transition-all duration-300 hover:-translate-y-2"
                >
                  <button
                    onClick={() => handleDelete(card._id)}
                    className="absolute top-3 right-3 z-20 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 shadow-lg"
                  >
                    <MdDeleteOutline size={20} />
                  </button>

                  <FlipCard rotate="y" {...card} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoCard;

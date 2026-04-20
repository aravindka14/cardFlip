const PhotoCard = ({ title, url }) => {
  return (
    <div className="border min-h-[300px]   rounded-lg bg-gray-100 border-gray-200 flex flex-col items-center p-4 gap-10">
      <div className="min-h-18">
        <p className="text-xl font-semibold text-center text-gray-600 line-clamp-2">
          {title}
        </p>
      </div>

      <img
        src="https://placehold.co/600x400/000000/FFF"
        alt={title}
        onError={(e) => {
          e.preventDefault();
          e.target.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZjYKPjVrCS_uKmuUXIkYNXPA3x0q_Y-hYQ&s";
        }}
      />
    </div>
  );
};

export default PhotoCard;

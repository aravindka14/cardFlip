import React, { useEffect, useRef, useState } from "react";
import { useGetGallery } from "../queries/gallery/useGalleryQueries";
import PhotoCard from "../components/PhotoCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Gallery = () => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const { data } = useGetGallery(page, limit);

  useEffect(() => {
    if (data) {
      setPhotos((prev) => [...prev, ...data]);
    }
  }, [data, page]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <InfiniteScroll
      dataLength={photos.length}
      loader={
        <div className="col-span-4 flex justify-center py-6">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      }
      next={fetchMore}
      hasMore={true}
      scrollThreshold={1}
      scrollableTarget="scrollableDiv"
    >
      <div className="p-9 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {photos.map((card) => (
          <PhotoCard key={card.id} {...card} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;

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
      loader={<h4>Loading...</h4>}
      next={fetchMore}
      hasMore={true}
      scrollableTarget="scrollableDiv"
    >
      <div className="p-9 grid grid-cols-4 gap-10">
        {photos.map((card) => (
          <PhotoCard key={card.id} {...card} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;

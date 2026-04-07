
import React, { useEffect, useRef, useState } from "react";
import { useGetGallery } from "../queries/gallery/useGalleryQueries";
import PhotoCard from "../components/PhotoCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const appendedPages = useRef(new Set());

  const { data } = useGetGallery(page);

  useEffect(() => {
    if (data && !appendedPages.current.has(page)) {
      appendedPages.current.add(page);
      if (data.length < 20) {
        setHasMore(false);
      }
      setPhotos((prev) => [...prev, ...data]);
    }
  }, [data, page]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
    console.log("next page");
  };

  return (
    <InfiniteScroll
      dataLength={photos.length}
      loader={<h4>Loading...</h4>}
      next={fetchMore}
      hasMore={hasMore}
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

import { Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Album from "../../../../lib/data/dataObjects/Album";
import { useEffect, useState } from "react";
import Photo from "../../../../lib/data/dataObjects/Photo";

type PhotosListProps = {
  album: Album;
};

export default function PhotosList({ album }: PhotosListProps) {
  if (!album) return <></>;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = async () => {
    console.log("fetching photos");
    try {
      album.photos(page, 12).then((newPhotos) => {
        if (newPhotos.length === 0) {
          setHasMore(false);
        }
        console.log("fetch complete");
        setPhotos((prevPhotos) => {
          const combined = [...prevPhotos, ...newPhotos];
          const unique = combined.filter((photo, index, self) => {
            return index === self.findIndex((p) => p.id === photo.id);
          });
          if (unique.length > prevPhotos.length) {
            // Update page number and check if there is more data available
            setPage((prevPage) => prevPage + 1);
          }
          return unique;
        });
      });

      
    } catch (error) {
      console.error("Error fetching Photos: ", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={fetchPhotos}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more photos to load.</p>}
    >
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} md={4}>
            <img src={photo.thumbnailUrl} alt={photo.title} className="img-fluid" />
            <h4>{photo.title}</h4>
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
}

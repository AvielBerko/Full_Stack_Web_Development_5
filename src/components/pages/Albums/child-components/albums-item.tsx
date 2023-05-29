import { ListGroupItem, Card, Button } from "react-bootstrap";
import Album from "../../../../lib/data/dataObjects/Album";
import { useEffect, useState } from "react";
import PhotosList from "./photos-list";
import { Nullable } from "../../../../types/react.types";

type AlbumItemProps = {
  album: Nullable<Album>;
  forceShowPhotos: Boolean;
};

export default function AlbumsItem({ album, forceShowPhotos }: AlbumItemProps) {
  if (!album) return <></>;

  const [showPhotos, setShowPhotos] = useState<Boolean>(false);

  useEffect(() => {
    if (forceShowPhotos) {
      setShowPhotos(true);
    }
  }, [forceShowPhotos]);

  return (
    <ListGroupItem>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
            {!forceShowPhotos && (<Button onClick={ () => {setShowPhotos(!showPhotos)}}>
              {showPhotos ? "Hide Photos" : "Show Photos"} 
            </Button>)
            }
          </Card.Body>
        </Card>

        {showPhotos && <PhotosList album={album}/> }
      </div>
    </ListGroupItem>
  );
}
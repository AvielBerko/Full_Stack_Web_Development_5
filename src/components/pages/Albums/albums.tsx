import { Container, Row, Col } from "react-bootstrap";
import AlbumsList from "./child-components/albums-list";
import { Outlet, useParams } from "react-router-dom";
import Album from "../../../lib/data/dataObjects/Album";
import { useEffect, useState } from "react";
import AlbumsItem from "./child-components/albums-item";

export default function Albums() {

  const [album, setAlbum] = useState<Album>();
  const { albumId } = useParams();

  useEffect(() => {
    const loadAlbum = async () => {
      const album = new Album({ id: albumId });
      album.load().then(() => setAlbum(album));
    };

    loadAlbum();
  }, [albumId]);

  if (albumId) {
    // Render AlbumPage component when "albumId" is present
    return <AlbumsItem album={album} forceShowPhotos={true} />;
  } else {
    // Render Albums component when "albumId" is not present
    return (
      <div>
        <Container>
          <Row className="text-center">
            <Col>
              <h1>Albums</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <AlbumsList />
            </Col>
          </Row>
        </Container>
        <Outlet />
      </div>
    );
  }
}

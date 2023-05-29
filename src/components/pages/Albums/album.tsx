import Album from "../../../lib/data/dataObjects/Album";
import { useEffect, useState } from "react";
import { Nullable } from "../../../types/react.types";
import AlbumsItem from "./child-components/albums-item";
import { useParams } from "react-router-dom";



export default function AlbumPage() {

    const [album, setAlbum] = useState<Nullable<Album>>();
    const { albumId } = useParams();
  
    useEffect(() => {
      const loadAlbum = async () => {
        const album = new Album({ id: albumId });
        album.load().then(() => setAlbum(album));
      };
  
      loadAlbum();
    }, [albumId]);

  return (
    <AlbumsItem album={album} forceShowPhotos={true}/>
  );
}
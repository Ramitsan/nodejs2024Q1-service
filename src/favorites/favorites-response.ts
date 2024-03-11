import { Album } from "src/albums/album";
import { Artist } from "src/artists/artist";
import { Track } from "src/tracks/track";

export interface FavoritesResponse{
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
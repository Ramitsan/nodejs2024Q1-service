import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/track.service';
import { Album } from 'src/albums/album';
import { Artist } from 'src/artists/artist';
import { Track } from 'src/tracks/track';
import { validate } from 'uuid';

const favorites: {
  tracks: Array<string>;
  artists: Array<string>;
  albums: Array<string>;
} = {
  tracks: [],
  artists: [],
  albums: [],
};

@Injectable()
export class FavoritesService {
  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}
  findAll() {
    console.log(favorites);
    const tracksMap: Record<string, Track> = {};
    this.tracksService.getTracks().forEach((track) => {
      tracksMap[track.id] = track;
    });
    const tracks = favorites.tracks.map((trackId) => tracksMap[trackId]);

    const albumsMap: Record<string, Album> = {};
    this.albumsService.getAlbums().forEach((album) => {
      albumsMap[album.id] = album;
    });
    const albums = favorites.albums.map((albumId) => albumsMap[albumId]);

    const artistsMap: Record<string, Artist> = {};
    this.artistsService.getArtists().forEach((artist) => {
      artistsMap[artist.id] = artist;
    });
    const artists = favorites.artists.map((artistId) => artistsMap[artistId]);
    console.log(tracks, albums, artists);
    return {
      tracks: tracks.filter((it) => it),
      albums: albums.filter((it) => it),
      artists: artists.filter((it) => it),
    };
  }

  addTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      this.tracksService.getTrack(id);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
    favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    const favoriteIndex = favorites.tracks.findIndex((track) => track == id);
    if (favoriteIndex != -1) {
      favorites.tracks.splice(favoriteIndex, 1);
    }
  }

  addAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      this.albumsService.getAlbum(id);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
    favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    const favoriteIndex = favorites.albums.findIndex((album) => album == id);
    if (favoriteIndex != -1) {
      favorites.albums.splice(favoriteIndex, 1);
    }
  }

  addArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      this.artistsService.getArtist(id);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
    favorites.artists.push(id);
  }

  removeArtist(id: string) {
    const favoriteIndex = favorites.artists.findIndex((artist) => artist == id);
    if (favoriteIndex != -1) {
      favorites.artists.splice(favoriteIndex, 1);
    }
  }
}

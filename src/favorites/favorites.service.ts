import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/track.service';
import { Album } from 'src/albums/album';
import { Artist } from 'src/artists/artist';
import { Track } from 'src/tracks/track';
import { validate } from 'uuid';
import { ArtistsDBService } from 'src/artists/artists-db.service';
import { AlbumsDBService } from 'src/albums/albums-db.service';
import { TracksDBService } from 'src/tracks/tracks-db.service';

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
    private tracksService: TracksDBService,
    private artistsService: ArtistsDBService,
    private albumsService: AlbumsDBService,
  ) {}
  async findAll() {
    // console.log(favorites);
    const tracksMap: Record<string, Track> = {};
    const tracks = await this.tracksService.getTracks();
    tracks.forEach((track) => {
      tracksMap[track.id] = track;
    });
    const favoritesTracks = favorites.tracks.map((trackId) => tracksMap[trackId]);

    const albumsMap: Record<string, Album> = {};
    const albums = await this.albumsService.getAlbums();
    albums.forEach((album) => {
      albumsMap[album.id] = album;
    });
    const favoritesAlbums = favorites.albums.map((albumId) => albumsMap[albumId]);

    const artistsMap: Record<string, Artist> = {};
    const artists = await this.artistsService.getArtists();
    artists.forEach((artist) => {
      artistsMap[artist.id] = artist;
    });
    const favoritesArtists = favorites.artists.map((artistId) => artistsMap[artistId]);
    // console.log(tracks, albums, artists);
    return {
      tracks: favoritesTracks.filter((it) => it),
      albums: favoritesAlbums.filter((it) => it),
      artists: favoritesArtists.filter((it) => it),
    };
  }

  async addTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      await this.tracksService.getTrack(id);
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

  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      await this.albumsService.getAlbum(id);
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

  async addArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    try {
      await this.artistsService.getArtist(id);
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

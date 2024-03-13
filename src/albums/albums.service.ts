import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { Album } from './album';
import { v4, validate } from 'uuid';
import { TracksService } from 'src/tracks/track.service';

const albums: Array<Album> = [];

@Injectable()
export class AlbumsService {
  constructor(private tracksService: TracksService) {}
  getAlbums() {
    return albums.map((album) => {
      return album;
    });
  }

  getAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const album = albums.find((album) => album.id == id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  createAlbum(body: CreateAlbumDto) {
    const validArtistId = body?.artistId == null || validate(body?.artistId);
    if (
      !body ||
      !body.name ||
      typeof body.name !== 'string' ||
      !body.year ||
      !validArtistId
    ) {
      throw new BadRequestException();
    }
    const album: Album = {
      id: v4(),
      name: body.name,
      year: body.year,
      artistId: body.artistId,
    };
    albums.push(album);
    return album;
  }

  updateAlbum(id: string, body: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const validArtistId = body?.artistId == null || validate(body?.artistId);
    if (
      !body ||
      !body.name ||
      typeof body.name !== 'string' ||
      !body.year ||
      !validArtistId
    ) {
      throw new BadRequestException();
    }
    const albumIndex = albums.findIndex((album) => album.id == id);
    const album = albums[albumIndex];
    if (!album) {
      throw new NotFoundException();
    }
    album.name = body.name;
    album.year = body.year;
    album.artistId = body.artistId;
    return album;
  }

  deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const albumIndex = albums.findIndex((album) => album.id == id);
    const album = albums[albumIndex];
    if (!album) {
      throw new NotFoundException();
    }
    albums.splice(albumIndex, 1);
    this.tracksService.removeAlbumId(id);
    return {};
  }

  removeArtistId(artistId: string) {
    albums.forEach((album) => {
      if (artistId == album.artistId) {
        album.artistId = null;
      }
    });
  }
}

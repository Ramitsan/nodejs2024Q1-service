import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';
import { Artist } from './artist';
import { v4, validate } from 'uuid';
import { TracksService } from 'src/tracks/track.service';
import { AlbumsService } from 'src/albums/albums.service';

const artists: Array<Artist> = [];

@Injectable()
export class ArtistsService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}
  getArtists() {
    return artists.map((artist) => {
      return artist;
    });
  }

  getArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artist = artists.find((artist) => artist.id == id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  createArtist(body: CreateArtistDto) {
    if (!body || !body.name || !body.grammy) {
      throw new BadRequestException();
    }
    const artist: Artist = {
      id: v4(),
      name: body.name,
      grammy: body.grammy,
    };
    artists.push(artist);
    return artist;
  }

  updateArtist(id: string, body: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    if (!body || !body.name || typeof body.grammy !== 'boolean') {
      throw new BadRequestException();
    }
    const artistIndex = artists.findIndex((artist) => artist.id == id);
    const artist = artists[artistIndex];
    if (!artist) {
      throw new NotFoundException();
    }
    artist.grammy = body.grammy;
    artist.name = body.name;
    return artist;
  }

  deleteArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artistIndex = artists.findIndex((artist) => artist.id == id);
    const artist = artists[artistIndex];
    if (!artist) {
      throw new NotFoundException();
    }
    artists.splice(artistIndex, 1);
    this.tracksService.removeArtistId(id);
    this.albumsService.removeArtistId(id);
    return {};
  }
}

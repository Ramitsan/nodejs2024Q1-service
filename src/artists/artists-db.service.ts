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
import { DataSource } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumsDBService } from 'src/albums/albums-db.service';

@Injectable()
export class ArtistsDBService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsDBService,
    private dataSource: DataSource,
  ) {}
  async getArtists() {
    return this.dataSource.manager.find(ArtistEntity, {});
  }

  async getArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artist = await this.dataSource.manager.findOne(ArtistEntity, {
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async createArtist(body: CreateArtistDto) {
    if (!body || !body.name || !body.grammy) {
      throw new BadRequestException();
    }
    const artistData: Artist = {
      id: v4(),
      name: body.name,
      grammy: body.grammy,
    };
    const artist = this.dataSource.manager.create(ArtistEntity, artistData);
    await this.dataSource.manager.save(ArtistEntity, artist);
    return artist;
  }

  async updateArtist(id: string, body: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    if (!body || !body.name || typeof body.grammy !== 'boolean') {
      throw new BadRequestException();
    }
    const artist = await this.dataSource.manager.findOne(ArtistEntity, {
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException();
    }
    artist.grammy = body.grammy;
    artist.name = body.name;

    await this.dataSource.manager.save(ArtistEntity, artist);
    return artist;
  }

  async deleteArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleteResult = await this.dataSource.manager.delete(ArtistEntity, {
      id,
    });
    if (deleteResult.affected == 0) {
      throw new NotFoundException();
    }
    await this.tracksService.removeArtistId(id);
    await this.albumsService.removeArtistId(id);
    return {};
  }
}

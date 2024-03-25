import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { Album } from './album';
import { v4, validate } from 'uuid';
import { DataSource } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TracksDBService } from 'src/tracks/tracks-db.service';

@Injectable()
export class AlbumsDBService {
  constructor(
    private tracksService: TracksDBService,
    private dataSource: DataSource,
  ) {}
  async getAlbums() {
    return this.dataSource.manager.find(AlbumEntity, {});
  }

  async getAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const album = await this.dataSource.manager.findOne(AlbumEntity, {
      where: { id },
    });

    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async createAlbum(body: CreateAlbumDto) {
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
    const albumData: Album = {
      id: v4(),
      name: body.name,
      year: body.year,
      artistId: body.artistId,
    };
    const album = this.dataSource.manager.create(AlbumEntity, albumData);
    await this.dataSource.manager.save(AlbumEntity, album);
    return album;
  }

  async updateAlbum(id: string, body: UpdateAlbumDto) {
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
    const album = await this.dataSource.manager.findOne(AlbumEntity, {
      where: { id },
    });
    if (!album) {
      throw new NotFoundException();
    }
    album.name = body.name;
    album.year = body.year;
    album.artistId = body.artistId;
    await this.dataSource.manager.save(AlbumEntity, album);
    return album;
  }

  async deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleteResult = await this.dataSource.manager.delete(AlbumEntity, {
      id,
    });
    if (deleteResult.affected == 0) {
      throw new NotFoundException();
    }

    await this.tracksService.removeAlbumId(id);
    return {};
  }

  async removeArtistId(artistId: string) {
    await this.dataSource.manager.update(
      AlbumEntity,
      { artistId },
      { artistId: null },
    );
  }
}

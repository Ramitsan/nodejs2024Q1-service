import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrackDto';
import { UpdateTrackDto } from './dto/updateTrackDto';
import { Track } from './track';
import { v4, validate } from 'uuid';
import { DataSource } from 'typeorm';
import { TrackEntity } from './track.entity';

@Injectable()
export class TracksDBService {
  constructor(private dataSource: DataSource) {}

  async getTracks() {
    return this.dataSource.manager.find(TrackEntity, {});
  }

  async getTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const track = await this.dataSource.manager.findOne(TrackEntity, {
      where: { id },
    });

    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async createTrack(body: CreateTrackDto) {
    if (
      !body ||
      !body.name ||
      !body.duration ||
      typeof body.duration !== 'number'
    ) {
      throw new BadRequestException();
    }
    const trackData: Track = {
      id: v4(),
      name: body.name,
      artistId: body.artistId,
      albumId: body.albumId,
      duration: body.duration,
    };
    const track = this.dataSource.manager.create(TrackEntity, trackData);
    await this.dataSource.manager.save(TrackEntity, track);
    return track;
  }

  async updateTrack(id: string, body: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    if (
      !body ||
      !body.name ||
      !body.duration ||
      typeof body.duration !== 'number'
    ) {
      throw new BadRequestException();
    }

    const track = await this.dataSource.manager.findOne(TrackEntity, {
      where: { id },
    });

    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async deleteTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleteResult = await this.dataSource.manager.delete(TrackEntity, {
      id,
    });
    if (deleteResult.affected == 0) {
      throw new NotFoundException();
    }

    return {};
  }

  async removeArtistId(artistId: string) {
    await this.dataSource.manager.update(
      TrackEntity,
      { artistId },
      { artistId: null },
    );
  }

  async removeAlbumId(albumId: string) {
    await this.dataSource.manager.update(
      TrackEntity,
      { albumId },
      { albumId: null },
    );
  }
}

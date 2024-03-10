import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrackDto';
import { UpdateTrackDto } from './dto/updateTrackDto';
import { Track } from './track';
import {v4, validate} from 'uuid';

const tracks: Array<Track> = [];

@Injectable()
export class TracksService {
  getTracks() {
    return tracks.map(track => {
      return track;
    })
  }

  getTrack(id: string) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    const track = tracks.find(track => track.id == id);
    if(!track) {
      throw new NotFoundException();
    } 
    return track;
  }

  createTrack(body: CreateTrackDto) {
    if(!body || !body.name || !body.duration || typeof body.duration !== 'number') {
      throw new BadRequestException();
    }
    const track: Track = {
      id: v4(),      
      name: body.name,
      artistId: body.artistId,
      albumId: body.albumId,
      duration: body.duration
    }
    tracks.push(track);
    return track;
  }

  updateTrack(id: string, body: UpdateTrackDto) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    if(!body || !body.name || !body.duration || typeof body.duration !== 'number') {
      throw new BadRequestException();
    }
    const trackIndex = tracks.findIndex(track => track.id == id);
    const track = tracks[trackIndex]; 
    if(!track) {
      throw new NotFoundException();
    } 
    return track;
  }

  deleteTrack(id: string) {
    if(!validate(id)) {
      throw new BadRequestException();
    }
    const trackIndex = tracks.findIndex(track => track.id == id);
    const track = tracks[trackIndex];
    if(!track) {
      throw new NotFoundException();
    } 
    tracks.splice(trackIndex, 1);
    return {};
  }
}

import { Controller, HttpCode } from '@nestjs/common';
import { TracksService } from './track.service';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CreateTrackDto } from './dto/createTrackDto';
import { UpdateTrackDto } from './dto/updateTrackDto';
import { TracksDBService } from './tracks-db.service';

@Controller('track')
export class TracksController {
  tracksService: TracksService | TracksDBService;

  constructor(
    private readonly tracksLocalService: TracksService,
    private readonly tracksDBService: TracksDBService,
  ) {}

  @Get()
  @HttpCode(200)
  getTracks() {
    return this.tracksService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  getTrack(@Param('id') id: string) {
    return this.tracksService.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() body: CreateTrackDto) {
    return this.tracksService.createTrack(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    return this.tracksService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.tracksService.deleteTrack(id);
  }
}

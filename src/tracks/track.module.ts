import { Module } from '@nestjs/common';
import { TracksController } from './track.controller';
import { TracksService } from './track.service';
import { TracksDBService } from './tracks-db.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, TracksDBService],
  exports: [TracksService, TracksDBService],
})
export class TracksModule {}

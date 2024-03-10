import { Module } from '@nestjs/common';
import { TracksController } from './track.controller';
import { TracksService } from './track.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}

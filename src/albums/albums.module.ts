import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/track.module';
import { AlbumsDBService } from './albums-db.service';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsDBService],
  exports: [AlbumsService, AlbumsDBService],
})
export class AlbumsModule {}

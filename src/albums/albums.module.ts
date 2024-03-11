import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/track.module';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule {}

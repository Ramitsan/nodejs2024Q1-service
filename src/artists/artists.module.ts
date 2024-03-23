import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from 'src/tracks/track.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsDBService } from './artist-db.service';

@Module({
  imports: [TracksModule, AlbumsModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsDBService],
  exports: [ArtistsService, ArtistsDBService],
})
export class ArtistsModule {}

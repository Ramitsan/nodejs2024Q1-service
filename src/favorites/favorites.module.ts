import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/track.module';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}

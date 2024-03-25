import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/track.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',      
      host: process.env.DB_HOST || '127.0.0.1',
      port: 5432,
      username: 'testuser',
      password: 'testpass',
      database: 'test_db_name',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

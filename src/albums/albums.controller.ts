import { Controller, HttpCode } from '@nestjs/common';
import { AlbumsService } from './albums.service';
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
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';
import { AlbumsDBService } from './albums-db.service';

@Controller('album')
export class AlbumsController {
  albumsService: AlbumsService | AlbumsDBService;
  
  constructor(private readonly albumsLocalService: AlbumsService, private readonly albumsDBService: AlbumsDBService) {
    this.albumsService = albumsDBService;
  } 

  @Get()
  @HttpCode(200)
  getAlbums() {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  getAlbum(@Param('id') id: string) {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.createAlbum(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    return this.albumsService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}

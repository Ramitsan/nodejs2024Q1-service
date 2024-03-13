import { Controller, HttpCode } from '@nestjs/common';
import { ArtistsService } from './artists.service';
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
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  getArtists() {
    return this.artistsService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@Param('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}

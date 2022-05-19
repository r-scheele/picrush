import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Session,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PhotosService } from './photos.service';
import { Photo } from './photos.entity';
import { createPhotoDto as createPhotoDto } from './dtos/create-photos.dto';
import { updatePhotoDto } from './dtos/update-photos.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('photos')
export class PhotosController {
  constructor(private PhotosService: PhotosService) {}

  @Post()
  async createRestaurant(@Body() body: createPhotoDto) {
    const {} = body;
    const photo = await this.PhotosService.create();
    return photo;
  }

  @Get('me')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.PhotosService.findOne(id);
  }

  @Get()
  findAllRestaurants(@Query('address') address: string) {
    const restaurants = this.PhotosService.find();
    return restaurants;
  }

  @Patch(':id')
  updateUser(@Body() body: updatePhotoDto, @Param('id') id: number) {
    return this.PhotosService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.PhotosService.remove(id);
  }
}

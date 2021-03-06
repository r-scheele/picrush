import { LikesService } from '../like/like.service';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Header,

} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PhotosService } from './photos.service';
import { createPhotoDto as createPhotoDto } from './dtos/create-photos.dto';
import { updatePhotoDto } from './dtos/update-photos.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService, private likeService: LikesService) {}

  @Post('new')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createNewPhoto(@Body() photo: createPhotoDto, @CurrentUser() user: User, @UploadedFile() file: Express.Multer.File) {
    return this.photosService.create(photo, user, file);
  }

  @Get(':id')
  findPhoto(@Param('id') id: number) {
    return this.photosService.findOne(id);
  }

  @Get()
  findAllPhotos(@CurrentUser() user: User) {
    const photos = this.photosService.findAllPhotoByUser(user);
    return photos;
  }

  @Patch(':id')
  updateUser(@Body() body: updatePhotoDto, @Param('id') id: number) {
    return this.photosService.update(id, body);
  }

  @Delete(':id')
  deletePhoto(@Param('id') id: number) {
    return this.photosService.remove(id);
  }




}

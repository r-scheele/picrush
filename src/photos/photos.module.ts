import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.entity';
import { PhotosService } from './photos.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { Like } from './like.entity';
import { LikesService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Like])],
  controllers: [PhotosController],
  providers: [PhotosService, CloudinaryProvider, LikesService],
  exports: [PhotosService, PhotosService],
})
export class PhotosModule {}

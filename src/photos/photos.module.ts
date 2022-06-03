import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.entity';
import { PhotosService } from './photos.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { LikesService } from '../like/like.service';
import { Like } from 'src/like/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Like])],
  controllers: [PhotosController],
  providers: [PhotosService, CloudinaryProvider, LikesService],
  exports: [PhotosService],
})
export class PhotosModule {}

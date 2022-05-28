import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.entity';
import { PhotosService } from './photos.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotosController],
  providers: [PhotosService, CloudinaryProvider],
  exports: [PhotosService, CloudinaryProvider],
})
export class PhotosModule {}

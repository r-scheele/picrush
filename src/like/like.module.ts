import { PhotosService } from 'src/photos/photos.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './like.controller';
import { Like } from './like.entity';
import { LikesService } from './like.service';
import { Photo } from 'src/photos/photos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Like, Photo])],
    controllers: [LikesController],
    providers: [LikesService, PhotosService],
    exports: [LikesService],
  })
export class LikeModule {}

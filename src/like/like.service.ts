import { PhotosService } from '../photos/photos.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Like } from './like.entity';
import { User } from 'src/user/user.entity';


@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private repo: Repository<Like>, private photoService: PhotosService) {}

  async likePhoto(photoId: number, user: User) {

    const photo = await this.photoService.findOne(photoId);
    if (!photo) {
      throw new NotFoundException(`Photo with id ${photoId} not found`);
    }

    const like = await this.repo.findOne({ where: { photo,  user} });
    if (like) {
      throw new BadRequestException('You have already liked this photo');
    }

    const newLike = this.repo.create({photo, user});
    await this.repo.save(newLike);

    let likes = await (await this.photoService.findOne(photoId)).likes.length;
    return {msg: 'You have successfully liked this photo', likes: likes};
  }

 


  async unlikePhoto(photoId: number, user: User) {
    const photo = await this.photoService.findOne(photoId);
    if (!photo) {
      throw new NotFoundException(`Photo with id ${photoId} not found`);
    }
    const like = await this.repo.findOne({ where: { photo,  user} });
    if (!like) {
      throw new BadRequestException('You have not liked this photo');
    }
    await this.repo.remove(like);

    let likes = await (await this.photoService.findOne(photoId)).likes.length;
    return {msg: 'You have successfully unliked this photo', likes: likes};
  }
  }





import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photos.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { createPhotoDto } from './dtos/create-photos.dto';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

import { User } from 'src/user/user.entity';


@Injectable()
export class PhotosService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async create(photo: createPhotoDto, user: User, file: Express.Multer.File) {
    const photos = await this.repo.find({name: photo.name});
    if (photos.length) {
      throw new BadRequestException(`Photo with this name already exist`);
    }

    const {url} = await this.uploadImageToCloudinary(file);
    const newPhoto = this.repo.create(photo);
    newPhoto.user = user;
    newPhoto.imageUrl = url;
    return this.repo.save(newPhoto);
  }

  findOne(id: number) {
    if (!id) throw new NotFoundException('Please provide a valid id');
    const photo = this.repo.findOne(id);
    return photo;
  }

  find() {
    
    const photos = this.repo.find({});
    return photos;
  }

  async update(id: number, attrs: Partial<Photo>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('Restaurant not found!');

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const photo = await this.findOne(id);
    if (!photo) throw new NotFoundException('Photo with this id not found');
    return this.repo.remove(photo);
  }




  async uploadImageToCloudinary(file: Express.Multer.File) {
    const res = await this.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });


    return res;
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}

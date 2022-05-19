import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photos.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
@Injectable()
export class PhotosService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async create() {
    const photos = await this.find();
    if (photos.length) {
      throw new BadRequestException(`Restaurant with this email already exist`);
    }
    const photo = this.repo.create({});
    return this.repo.save(photo);
  }

  findOne(id: number) {
    if (!id) throw new NotFoundException('Restaurant not found');
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
    if (!photo) throw new NotFoundException('User not found!');

    return this.repo.remove(photo);
  }
}

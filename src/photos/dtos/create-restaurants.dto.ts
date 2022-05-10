import { Optional } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { Category } from '../photos.entity';

export class createPhotoDto {
  @IsEmail()
  email: string;

  @Optional()
  @IsString()
  phoneNumber: string;

  @Optional()
  @IsString()
  description: string;

  @IsString()
  name: string;

  @Optional()
  @IsString()
  category: Category;

  @Optional()
  @IsString()
  address: string;
}

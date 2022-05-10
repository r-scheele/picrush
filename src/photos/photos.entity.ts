import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Optional } from '@nestjs/common';

export enum Category {
  FAST_FOOD = 'fast food',
  CAFE = 'cafe',
  FINE_DINNING = 'fine dinning',
}

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Optional()
  @Column()
  phoneNumber: string;

  @Optional()
  @Column()
  category: Category;

  @Optional()
  @Column()
  address: string;

  // @Column()
  // images?: object[];
}

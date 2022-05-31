import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Optional, Post } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Photo } from './photos.entity';



@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.likes, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) user: User;

  @ManyToOne(() => Photo, photo => photo.likes, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) photo: Photo; 
}

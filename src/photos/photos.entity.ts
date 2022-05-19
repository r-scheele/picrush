import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Optional } from '@nestjs/common';
import { User } from 'src/user/user.entity';



@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

 
  @ManyToOne(() => User, user => user.photos, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) user: User; 
}

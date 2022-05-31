import { Like } from 'src/photos/like.entity';
import { Photo } from 'src/photos/photos.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Like, like => like.user) likes: Like[]; 
  @OneToMany(() => Photo, photo => photo.user) photos: Photo[]; 
}

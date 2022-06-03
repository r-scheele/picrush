import { Like } from 'src/like/like.entity';
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

  @Column("int", { array: true, default: {} })
  followers: Number[];

  @Column("int", { array: true, default: {} })
  followings: Number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Like, like => like.user) likes: Like[]; 
  @OneToMany(() => Photo, photo => photo.user) photos: Photo[]; 
}

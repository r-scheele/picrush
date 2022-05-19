import { Photo } from 'src/photos/photos.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @OneToMany(() => Photo, photo => photo.user) photos: Photo[]; 
}

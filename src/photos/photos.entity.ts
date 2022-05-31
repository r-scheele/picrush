import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad } from 'typeorm';
import { Optional } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Like } from './like.entity';



@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({default: 0})
  numberOfLikes: number;

  @Column({default: 0})
  viewCount: number;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({default: 0})
  downloadCount: number;

  @Column()
  category: string;

  @Column({default: true})
  isFree: boolean;

  @Column()
  location: string;
 
 @AfterLoad()
  async loadLikes() {
    this.numberOfLikes = this.likes.length
  }


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;



  @OneToMany(() => Like, like => like.photo,  {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) likes: Like[]; 
  @ManyToOne(() => User, user => user.photos, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) user: User; 
}

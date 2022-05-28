import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Optional } from '@nestjs/common';
import { User } from 'src/user/user.entity';



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
 

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;



  @ManyToOne(() => User, user => user.photos, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  }) user: User; 
}

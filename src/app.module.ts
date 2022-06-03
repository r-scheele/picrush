import { Like } from 'src/like/like.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/photos.entity';
import { SocialsService } from './socials/socials.service';
import { SocialsController } from './socials/socials.controller';
import { SocialsModule } from './socials/socials.module';
import { LikeModule } from './like/like.module';
import { LikesController } from './like/like.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';



console.log(process.env.DB_URI)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt('5432'),
      url: process.env.DB_URI,
      synchronize: true,
      entities: [User, Photo, Like],
      migrations: [],
      cli: {
        migrationsDir: 'migrations',
      },
      autoLoadEntities: true,
    }),
    UserModule,
    SocialsModule,
    PhotosModule,
    LikeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

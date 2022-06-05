import { ScheduleModule } from '@nestjs/schedule';


import { Like } from 'src/like/like.entity';
import { Module, CacheModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/photos.entity';
import { SocialsModule } from './socials/socials.module';
import { LikeModule } from './like/like.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './user/interceptors/current-user.interceptor';


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
    ScheduleModule.forRoot(),
    UserModule,
    SocialsModule,
    PhotosModule,
    LikeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

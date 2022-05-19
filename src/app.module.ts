import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/photos.entity';



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
      entities: [User, Photo],
      migrations: [],
      cli: {
        migrationsDir: 'migrations',
      },
      autoLoadEntities: true,
    }),
    UserModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

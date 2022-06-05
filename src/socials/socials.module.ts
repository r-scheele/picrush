import { PhotosService } from 'src/photos/photos.service';
import { AuthService } from './../user/auth.service';
import { UserModule } from './../user/user.module';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';
import { User } from 'src/user/user.entity';
import { Photo } from 'src/photos/photos.entity';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([User, Photo])],
  controllers: [SocialsController],
  providers: [SocialsService, UserService, AuthService],
})
export class SocialsModule {}

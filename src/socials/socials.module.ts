import { AuthService } from './../user/auth.service';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SocialsController],
  providers: [SocialsService]
})
export class SocialsModule {}

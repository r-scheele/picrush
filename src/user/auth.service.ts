import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { Cache } from 'cache-manager';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }


    const hashed = await this.hash_password(password);
    return await this.userService.create(email, hashed);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    await this.cacheManager.set(user.id.toString(), user);
    return user;
  }
  async hash_password(password:string) {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  }
}

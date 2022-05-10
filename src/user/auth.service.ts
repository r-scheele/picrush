import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return await this.userService.create(email, hashed);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    return user;
  }
}

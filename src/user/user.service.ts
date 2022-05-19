import { Inject, Injectable, NotFoundException, forwardRef} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
  @Inject(forwardRef(() => AuthService)) private authService: AuthService) {}
 

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) throw new NotFoundException('User not found');
    const user = this.repo.findOne(id);
    return user;
  }

  async find(email: string) {
   if (!email){
      return this.repo.find();
   }
    const users = await this.repo.find({ email });
    return users;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    if (attrs.password) {
      attrs.password = await this.authService.hash_password(attrs.password);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    return this.repo.remove(user);
  }
}

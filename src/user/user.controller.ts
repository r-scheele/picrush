import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { createUserDto } from './dtos/create.user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dtos';
import { User } from './user.entity';
import { UserService } from './user.service';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signInUser(@Body() body: createUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signIn(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  logOutCurrentUser(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    const users = this.userService.find(email);
    return users;
  }

  @Patch(':id')
  updateUser(@Body() body: updateUserDto, @Param('id') id: number) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

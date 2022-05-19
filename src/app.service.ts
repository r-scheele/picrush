import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello():  { message: string; author: string, repository: string } {
    return {
      message: 'Hello World!',
      author: 'Habeeb Olamilekan',
      repository: 'https://github.com/r-scheele/picrush'
    }
  }
}

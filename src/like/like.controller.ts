

import { LikesService } from '../like/like.service';
import {
  Controller,
  Post,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { PhotosService } from 'src/photos/photos.service';

@UseGuards(AuthGuard)
@Controller('react')
export class LikesController {
  constructor(private photosService: PhotosService, private likeService: LikesService) {}


  @Post(':photoId/like')
  likePhoto(@Param('photoId') photoId: number, @CurrentUser() user: User) {
    return this.likeService.likePhoto(photoId, user);
  }

  @Delete(':photoId/unlike')
  unlikePhoto(@Param('photoId') photoId: number, @CurrentUser() user: User) {
    return this.likeService.unlikePhoto(photoId, user);
  }


}



import { Controller, Param, Put, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { SocialsService } from './socials.service';


@UseGuards(AuthGuard)
@Controller()
export class SocialsController {
    constructor(
        private socialsService: SocialsService,
    ) {}

    @Put('follow/:userId')
    async follow(@Param('userId') userId: number, @CurrentUser() user: User) {
        return this.socialsService.follow(userId, user);
    }

    @Put('unfollow/:userId')
    async unfollow(@Param('userId') userId: number, @CurrentUser() user: User) {
        return this.socialsService.unfollow(userId, user);
    }


    @Get('followers/:userId')
    async followers(@Param('userId') userId: number, @CurrentUser() user: User) {
        return this.socialsService.followers(userId, user);
    }

    @Get('followings/:userId')
    async followings(@Param('userId') userId: number, @CurrentUser() user: User) {
        return this.socialsService.followings(userId, user);
    }

    @Get('feeds')
    async feeds(@CurrentUser() user: User) {
        return this.socialsService.feeds(user);
    }
}

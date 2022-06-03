import { Controller, Put } from '@nestjs/common';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { SocialsService } from './socials.service';

@Controller()
export class SocialsController {
    constructor(
        private socialsService: SocialsService,
    ) {}

    @Put(':userId/follow')
    async follow(userId: number, @CurrentUser() user: User) {
        return this.socialsService.follow(userId, user);
    }

    @Put(':userId/unfollow')
    async unfollow(userId: number, @CurrentUser() user: User) {
        return this.socialsService.unfollow(userId, user);
    }
}

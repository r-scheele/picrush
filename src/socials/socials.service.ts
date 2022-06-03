import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialsService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,) {}


    async follow(userId: number, currentUser: User) {
        if (currentUser.id !== userId) {
            const user = await this.userRepo.findOne(userId);
            if (!user.followers.includes(currentUser.id)) {
            user.followers.push(currentUser.id);
            await this.userRepo.save(user);

            const follower = await this.userRepo.findOne(currentUser.id);
            follower.followings.push(user.id);
            await this.userRepo.save(follower);
        }    
    }
}



    async unfollow(userId: number, follower: User) {
        if (follower.id !== userId) {
            const user = await this.userRepo.findOne(userId);
            if (user.followers.includes(follower.id)) {
            user.followers = user.followers.filter(id => id !== follower.id);
            await this.userRepo.save(user);

            const unfollower = await this.userRepo.findOne(follower.id);
            unfollower.followings = unfollower.followings.filter(id => id !== user.id);
            await this.userRepo.save(unfollower);
            }
        } 
    }
}

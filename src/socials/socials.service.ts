
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialsService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,) {}


    async follow(userId: number, currentUser: User) {

     
        // you can't follow your own profile
        if (currentUser.id === userId) throw new Error('You can\'t follow your own profile');
        

        const userToBeFollowed = await this.userRepo.findOne(userId);
        const follower = await this.userRepo.findOne(currentUser.id);

        // you can't follow a user that you already followed - if your id is not in their followers array
        if (userToBeFollowed.followers.includes(follower.id)) throw new BadRequestException('You already follow this user');

        // you can't follow a user that you already follow - if their id is not in your followings array   
        if (follower.followings.includes(userToBeFollowed.id)) throw new BadRequestException('You already follow this user'); 
        
        userToBeFollowed.followers.push(follower.id);
        follower.followings.push(userToBeFollowed.id);

        await this.userRepo.save(userToBeFollowed);
        await this.userRepo.save(follower);

        return userToBeFollowed.followers
}



    async unfollow(userId: number, currentUser: User) {
             
        // you can't follow your own profile
        if (currentUser.id === userId) throw new Error('You can\'t unfollow your own profile');
        

        const userToBeUnFollowed = await this.userRepo.findOne(userId);
        const follower = await this.userRepo.findOne(currentUser.id);

        // you can't follow a user that you already followed - if your id is not in their followers array
        if (!userToBeUnFollowed.followers.includes(follower.id)) throw new BadRequestException('You haven\'t followed this user');

        // you can't follow a user that you already follow - if their id is not in your followings array   
        if (!follower.followings.includes(userToBeUnFollowed.id)) throw new BadRequestException('You haven\'t follow this user'); 

        userToBeUnFollowed.followers = userToBeUnFollowed.followers.filter(id => id !== follower.id);
        follower.followings = follower.followings.filter(id => id !== userToBeUnFollowed.id);
        
        await this.userRepo.save(userToBeUnFollowed);
        await this.userRepo.save(follower);


        return userToBeUnFollowed.followers
    }

    async followers(userId: number, currentUser: User){
        const user = await this.userRepo.findOne(userId);
        return  this.userRepo.findByIds(user.followers)
    }

    async followings(userId: number, currentUser: User){
        const user = await this.userRepo.findOne(userId);
        return  this.userRepo.findByIds(user.followings)
    }
}

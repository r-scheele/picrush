import { Photo } from 'src/photos/photos.entity';
import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';


export class createLikeDto {
    
photoId: number;
userId: number;
    
}

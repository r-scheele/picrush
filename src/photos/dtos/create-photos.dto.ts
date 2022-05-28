import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';


export class createPhotoDto {
    
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    category: string;

    @IsBoolean()
    @Transform(({ value }) => {  
        return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;  
      }) 
    isFree: boolean;

    @IsString()
    @IsOptional()
    location: string;
    
}

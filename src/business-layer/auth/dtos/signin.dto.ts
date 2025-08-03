import {IsString, IsEmail, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({
        description: 'User email address',
        example: 'example@example.com',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
    })
    @IsString()
    @MinLength(8)
    password: string;
}
import {IsString, IsEmail, MinLength} from 'class-validator';

export class SignInDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
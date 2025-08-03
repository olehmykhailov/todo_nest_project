import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
    @IsString()
    id: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}
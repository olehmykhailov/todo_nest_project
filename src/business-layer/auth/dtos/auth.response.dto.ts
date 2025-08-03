import { IsString, IsOptional, IsUUID, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;

    @IsUUID()
    userId: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;
}

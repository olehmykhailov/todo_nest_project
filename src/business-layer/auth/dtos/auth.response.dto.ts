import { IsString, IsOptional, IsUUID, IsEmail } from 'class-validator';

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

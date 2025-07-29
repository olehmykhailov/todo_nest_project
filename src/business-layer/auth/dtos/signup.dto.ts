import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message:
            'Password must contain at least one uppercase letter, one number and one special character',
        }
    )
    password: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

}
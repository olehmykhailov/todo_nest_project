import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty({
        description: 'User email address',
        example: 'example@example.com',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'User password of next requirements: minimum 8 characters, maximum 32 characters, at least one uppercase letter, one number, and one special character',
        example: 'Password123!',
    })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message:
            'Password must contain at least one uppercase letter, one number and one special character',
        }
    )
    password: string;

    @ApiPropertyOptional({
        description: 'User first name',
        example: 'John',
        required: false,
    })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({
        description: 'User last name',
        example: 'Doe',
        required: false,
    })
    @IsString()
    @IsOptional()
    lastName?: string;

}
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
        return this.authService.signUp(signUpDto);
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<AuthResponseDto> {
        return this.authService.signIn(signInDto);
    }
}

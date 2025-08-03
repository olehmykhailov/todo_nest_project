import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiBody({
        type: SignUpDto,
        description: 'User registration data',
    })
    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
        return this.authService.signUp(signUpDto);
    }

    @ApiBody({
        type: SignInDto,
        description: 'User login data',
    })
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<AuthResponseDto | null> {
        return this.authService.signIn(signInDto);
    }

    @ApiBearerAuth()
    @ApiBody({
        type: String,
        description: 'Refresh token to obtain new access token',
    })
    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto | null> {
        return this.authService.refreshToken(refreshToken);
    }
}

import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { JwtTokenService } from './jwt/jwt.service';
import { UsersRepositoryProvider } from 'src/data-layer/providers/user.repository.provider';
import { UtilsService } from '../utils/utils.service';
import { SignUpDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly usersRepositoryProvider: UsersRepositoryProvider,
        private readonly utilsService: UtilsService,
    ) {}

    async signIn(signInDto: SignInDto): Promise<AuthResponseDto | null> {
        const user = await this.usersRepositoryProvider.findByEmail(signInDto.email);
        if (!user || !(await this.utilsService.comparePasswords(signInDto.password, user.password))) {
            return null;
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtTokenService.generateAccessToken(payload);
        const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

        const response = new AuthResponseDto();

        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        response.userId = user.id;
        response.email = user.email;
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        return response;
    }

    async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
        const hashedPassword = await this.utilsService.hashPassword(signUpDto.password);
        const user = await this.usersRepositoryProvider.createUser({
            email: signUpDto.email,
            password: hashedPassword,
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
        });

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtTokenService.generateAccessToken(payload);
        const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

        const response = new AuthResponseDto();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        response.userId = user.id;
        response.email = user.email;
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        return response;
    }
}

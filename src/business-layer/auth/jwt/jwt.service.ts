import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from '../interfaces/payload.interface';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(payload: PayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: PayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  verifyRefreshToken(token: string): PayloadInterface {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}

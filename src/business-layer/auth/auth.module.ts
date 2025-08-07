import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt/jwt.service';
import { DataLayerModule } from 'src/data-layer/data.layer.module';
import { UtilsModule } from '../utils/utils.module';
import { RedisModule } from '../redis/redis.module';


@Module({
    imports:
    [
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
      DataLayerModule, UtilsModule, RedisModule

    ],
    providers: [AuthService, JwtStrategy, JwtTokenService],
    controllers: [AuthController]
})
export class AuthModule {}

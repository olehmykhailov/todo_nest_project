import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataLayerModule } from 'src/data-layer/data.layer.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    DataLayerModule,
    RedisModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

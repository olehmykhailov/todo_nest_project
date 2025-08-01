import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataLayerModule } from 'src/data-layer/data.layer.module';

@Module({
  imports: [
    DataLayerModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

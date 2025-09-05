import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './business-layer/auth/auth.module';
import { TasksModule } from './business-layer/tasks/tasks.module';
import { UsersModule } from './business-layer/users/users.module';
import { DataLayerModule } from './data-layer/data.layer.module';
import { UserEntity } from './data-layer/entities/user.entity';
import { TaskEntity } from './data-layer/entities/task.entity';
import { RedisModule } from './business-layer/redis/redis.module';
import { LivelinessModule } from './business-layer/liveliness/liveliness.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // Set to false in production
    }),
    TypeOrmModule.forFeature(
      [UserEntity, TaskEntity]
    ),
    AuthModule, TasksModule, UsersModule, DataLayerModule, RedisModule, LivelinessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
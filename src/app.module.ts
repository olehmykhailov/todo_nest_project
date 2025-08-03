import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './business-layer/auth/auth.module';
import { TasksModule } from './business-layer/tasks/tasks.module';
import { UsersModule } from './business-layer/users/users.module';
import { DataLayerModule } from './data-layer/data.layer.module';
import { UserEntity } from './data-layer/entities/user.entity';
import { TaskEntity } from './data-layer/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3000,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature(
      [UserEntity, TaskEntity]
    ),
    AuthModule, TasksModule, UsersModule, DataLayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

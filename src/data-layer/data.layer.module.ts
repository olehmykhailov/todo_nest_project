import { Module } from '@nestjs/common';
import { UsersRepositoryProvider } from './providers/user.repository.provider';
import { TaskRepositoryProvider } from './providers/task.repository.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TaskEntity } from './entities/task.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, TaskEntity]),
    ],
    providers: [UsersRepositoryProvider, TaskRepositoryProvider],
    exports: [UsersRepositoryProvider, TaskRepositoryProvider],
})
export class DataLayerModule {}
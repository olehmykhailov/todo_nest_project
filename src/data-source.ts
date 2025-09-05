import { DataSource } from 'typeorm';
import { UserEntity } from './data-layer/entities/user.entity';
import { TaskEntity } from './data-layer/entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  entities: [UserEntity, TaskEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

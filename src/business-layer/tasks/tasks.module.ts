import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DataLayerModule } from 'src/data-layer/data.layer.module';

@Module({
  imports: [DataLayerModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "src/data-layer/entities/task.entity";

@Injectable()
export class TaskRepositoryProvider {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}
    
    async getTaskById(id: string): Promise<TaskEntity | null> {
        return this.taskRepository.findOne({ where: { id } });
    }

    async getTaskByUserId(userId: string): Promise<TaskEntity[]> {
        return this.taskRepository.find({ where: { userId } });
    }
    
    async getTaskByTitle(title: string): Promise<TaskEntity | null> {
        return this.taskRepository.findOne({ where: {title}})
    }

    async createTask(taskData: Partial<TaskEntity>): Promise<TaskEntity> {
        const task = this.taskRepository.create(taskData);
        return this.taskRepository.save(task);
    }
    
    async updateTask(id: string, taskData: Partial<TaskEntity>) {
        return await this.taskRepository.update(id, taskData);
    }
    
    async deleteTask(id: string) {
        return await this.taskRepository.delete(id);
    }
}
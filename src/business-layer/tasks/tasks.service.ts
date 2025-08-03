import { Injectable } from '@nestjs/common';
import { TaskRepositoryProvider } from 'src/data-layer/providers/task.repository.provider';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskResponseDto } from './dtos/task.response.dto';

@Injectable()
export class TasksService {
	constructor(
		private readonly taskRepositoryProvider: TaskRepositoryProvider,
	) {}

	async getTasksByUserId(userId: string): Promise<TaskResponseDto[] | null> {
		const tasks = await this.taskRepositoryProvider.getTaskByUserId(userId);
		if (!tasks || tasks.length === 0) return null;

		return tasks.map(task => ({
			id: task.id,
			title: task.title,
			description: task.description ?? '',
			completed: task.completed,
			userId: task.userId,
		}));
	}

	async getTaskById(id: string): Promise<TaskResponseDto | null> {
		const task = await this.taskRepositoryProvider.getTaskById(id);
		if (!task) return null;

		return {
			id: task.id,
			title: task.title,
			description: task.description ?? '',
			completed: task.completed,
			userId: task.userId,
		};
	}

	async createTask(taskData: TaskRequestDto): Promise<number> {
		try {
			await this.taskRepositoryProvider.createTask(taskData);
			return 200;
		} catch (error) {
			console.error('Error creating task:', error);
			return 500;
		}
	}

	async updateTask(id: string, taskData: TaskRequestDto): Promise<number> {
		try {
			await this.taskRepositoryProvider.updateTask(id, taskData);
			return 200;
		} catch (error) {
			console.error('Error updating task:', error);
			return 500;
		}
	}
}

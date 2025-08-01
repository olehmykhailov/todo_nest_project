import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskResponseDto } from './dtos/task.response.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get(':userId')
	async getTasksByUserId(@Param('userId') userId: string): Promise<TaskResponseDto[] | null> {
		return this.tasksService.getTasksByUserId(userId);
	}

	@Get(':id')
	async getTaskById(@Param('id') id: string): Promise<TaskResponseDto | null> {
		return this.tasksService.getTaskById(id);
	}

	@Post()
	async createTask(@Body() taskData: TaskRequestDto): Promise<number> {
		return this.tasksService.createTask(taskData);
	}

	@Patch(':id')
	async updateTask(
		@Param('id') id: string,
		@Body() taskData: TaskRequestDto,
	): Promise<number> {
		return this.tasksService.updateTask(id, taskData);
	}
}

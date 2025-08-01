import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskResponseDto } from './dtos/task.response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get(':userId')
	async getTasksByUserId(@Param('userId') userId: string): Promise<TaskResponseDto[] | null> {
		return this.tasksService.getTasksByUserId(userId);
	}

    @UseGuards(AuthGuard('jwt'))
	@Get(':id')
	async getTaskById(@Param('id') id: string): Promise<TaskResponseDto | null> {
		return this.tasksService.getTaskById(id);
	}

    @UseGuards(AuthGuard('jwt'))
	@Post()
	async createTask(@Body() taskData: TaskRequestDto): Promise<number> {
		return this.tasksService.createTask(taskData);
	}

    @UseGuards(AuthGuard('jwt'))
	@Patch(':id')
	async updateTask(
		@Param('id') id: string,
		@Body() taskData: TaskRequestDto,
	): Promise<number> {
		return this.tasksService.updateTask(id, taskData);
	}
}

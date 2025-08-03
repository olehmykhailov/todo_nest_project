import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskResponseDto } from './dtos/task.response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@ApiBody({
		type: TaskRequestDto,
		description: 'Task creation data',
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Get(':userId')
	async getTasksByUserId(@Param('userId') userId: string): Promise<TaskResponseDto[] | null> {
		return this.tasksService.getTasksByUserId(userId);
	}

	@ApiBody({
		type: String,
		description: 'Task ID to retrieve',
	})
	@ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	@Get(':id')
	async getTaskById(@Param('id') id: string): Promise<TaskResponseDto | null> {
		return this.tasksService.getTaskById(id);
	}


	@ApiBody({		
		type: TaskRequestDto,
		description: 'Task creation data',
	})
	@ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	@Post()
	async createTask(@Body() taskData: TaskRequestDto): Promise<number> {
		return this.tasksService.createTask(taskData);
	}

	@ApiBody({
		type: TaskRequestDto,
		description: 'Task update data',
	})
	@ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	@Patch(':id')
	async updateTask(
		@Param('id') id: string,
		@Body() taskData: TaskRequestDto,
	): Promise<number> {
		return this.tasksService.updateTask(id, taskData);
	}
}

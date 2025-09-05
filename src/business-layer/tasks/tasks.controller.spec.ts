import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: any;

  beforeEach(async () => {
    service = {
      getTasksByUserId: jest.fn(),
      getTaskById: jest.fn(),
      createTask: jest.fn(),
      updateTask: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: service },
      ],
    }).compile();
    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasksByUserId', () => {
    it('should return tasks for user', async () => {
      const result = [{ id: '1', title: 'Test', description: '', completed: false, userId: 'u1' }];
      service.getTasksByUserId.mockResolvedValue(result);
      expect(await controller.getTasksByUserId('u1')).toEqual(result);
      expect(service.getTasksByUserId).toHaveBeenCalledWith('u1');
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const result = { id: '1', title: 'Test', description: '', completed: false, userId: 'u1' };
      service.getTaskById.mockResolvedValue(result);
      expect(await controller.getTaskById('1')).toEqual(result);
      expect(service.getTaskById).toHaveBeenCalledWith('1');
    });
  });

  describe('createTask', () => {
    it('should create a task and return status', async () => {
      service.createTask.mockResolvedValue(200);
      const dto = { title: 'T', description: '', userId: 'u1' };
      expect(await controller.createTask(dto)).toBe(200);
      expect(service.createTask).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateTask', () => {
    it('should update a task and return status', async () => {
      service.updateTask.mockResolvedValue(200);
      const dto = { title: 'T', description: '', userId: 'u1' };
      expect(await controller.updateTask('1', dto)).toBe(200);
      expect(service.updateTask).toHaveBeenCalledWith('1', dto);
    });
  });
});

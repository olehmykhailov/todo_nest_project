import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepositoryProvider } from 'src/data-layer/providers/task.repository.provider';

describe('TasksService', () => {
  let service: TasksService;
  let repo: any;

  beforeEach(async () => {
    repo = {
      getTaskByUserId: jest.fn(),
      getTaskById: jest.fn(),
      createTask: jest.fn(),
      updateTask: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepositoryProvider, useValue: repo },
      ],
    }).compile();
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasksByUserId', () => {
    it('should return mapped tasks', async () => {
      const tasks = [
        { id: '1', title: 'T', description: 'D', completed: false, userId: 'u1' },
      ];
      repo.getTaskByUserId.mockResolvedValue(tasks);
      const result = await service.getTasksByUserId('u1');
      expect(result).toEqual([
        { id: '1', title: 'T', description: 'D', completed: false, userId: 'u1' },
      ]);
    });
    it('should return null if no tasks', async () => {
      repo.getTaskByUserId.mockResolvedValue([]);
      expect(await service.getTasksByUserId('u1')).toBeNull();
    });
  });

  describe('getTaskById', () => {
    it('should return mapped task', async () => {
      const task = { id: '1', title: 'T', description: 'D', completed: false, userId: 'u1' };
      repo.getTaskById.mockResolvedValue(task);
      expect(await service.getTaskById('1')).toEqual(task);
    });
    it('should return null if not found', async () => {
      repo.getTaskById.mockResolvedValue(null);
      expect(await service.getTaskById('1')).toBeNull();
    });
  });

  describe('createTask', () => {
    it('should return 200 on success', async () => {
      repo.createTask.mockResolvedValue(undefined);
      expect(await service.createTask({ title: 'T', description: 'D', userId: 'u1' })).toBe(200);
    });
    it('should return 500 on error', async () => {
      repo.createTask.mockRejectedValue(new Error('fail'));
      expect(await service.createTask({ title: 'T', description: 'D', userId: 'u1' })).toBe(500);
    });
  });

  describe('updateTask', () => {
    it('should return 200 on success', async () => {
      repo.updateTask.mockResolvedValue(undefined);
      expect(await service.updateTask('1', { title: 'T', description: 'D', userId: 'u1' })).toBe(200);
    });
    it('should return 500 on error', async () => {
      repo.updateTask.mockRejectedValue(new Error('fail'));
      expect(await service.updateTask('1', { title: 'T', description: 'D', userId: 'u1' })).toBe(500);
    });
  });
});

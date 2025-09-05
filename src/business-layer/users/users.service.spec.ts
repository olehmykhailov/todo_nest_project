import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepositoryProvider } from 'src/data-layer/providers/user.repository.provider';
import { RedisService } from '../redis/redis.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: any, redis: any;

  beforeEach(async () => {
    repo = {
      findById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    redis = {
      get: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepositoryProvider, useValue: repo },
        { provide: RedisService, useValue: redis },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return cached user if present', async () => {
      redis.get.mockResolvedValue(JSON.stringify({ id: '1', email: 'a' }));
      expect(await service.getUserById('1')).toEqual({ id: '1', email: 'a' });
    });
    it('should throw if user not found', async () => {
      redis.get.mockResolvedValue(null);
      repo.findById.mockResolvedValue(null);
      await expect(service.getUserById('1')).rejects.toThrow();
    });
    it('should return user if found in repo', async () => {
      redis.get.mockResolvedValue(null);
      repo.findById.mockResolvedValue({ id: '1', email: 'a', firstName: 'A', lastName: 'B' });
      const result = await service.getUserById('1');
      expect(result).toMatchObject({ id: '1', email: 'a', firstName: 'A', lastName: 'B' });
    });
  });

  describe('updateUser', () => {
    it('should throw if update fails', async () => {
      repo.updateUser.mockResolvedValue(null);
      await expect(service.updateUser('1', { email: 'a' })).rejects.toThrow();
    });
    it('should return updated user', async () => {
      repo.updateUser.mockResolvedValue({ id: '1', email: 'a' });
      expect(await service.updateUser('1', { email: 'a' })).toEqual({ id: '1', email: 'a' });
    });
  });

  describe('deleteUser', () => {
    it('should throw if delete fails', async () => {
      repo.deleteUser.mockResolvedValue({ affected: 0 });
      await expect(service.deleteUser('1')).rejects.toThrow();
    });
    it('should return message if ok', async () => {
      repo.deleteUser.mockResolvedValue({ affected: 1 });
      expect(await service.deleteUser('1')).toEqual({ message: 'User deleted successfully' });
    });
  });
});

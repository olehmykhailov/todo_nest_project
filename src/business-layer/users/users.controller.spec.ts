import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: any;

  beforeEach(async () => {
    service = {
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: service },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should call service and return user', async () => {
      const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' };
      service.getUserById.mockResolvedValue(user);
      expect(await controller.getUser('1')).toBe(user);
      expect(service.getUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUser', () => {
    it('should call service and return updated user', async () => {
      const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' };
      service.updateUser.mockResolvedValue(user);
      expect(await controller.updateUser(user, '1')).toBe(user);
      expect(service.updateUser).toHaveBeenCalledWith('1', user);
    });
  });

  describe('deleteUser', () => {
    it('should call service and return result', async () => {
      const result = { message: 'User deleted successfully' };
      service.deleteUser.mockResolvedValue(result);
      expect(await controller.deleteUser('1')).toBe(result);
      expect(service.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});

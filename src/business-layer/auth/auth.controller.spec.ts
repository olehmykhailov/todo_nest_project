import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: any;

  beforeEach(async () => {
    service = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      refreshToken: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: service },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call service and return AuthResponseDto', async () => {
      const dto = { email: 'a@b.com', password: '123', firstName: 'A', lastName: 'B' };
      const response = { accessToken: 'a', refreshToken: 'b', userId: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' };
      service.signUp.mockResolvedValue(response);
      expect(await controller.signUp(dto)).toBe(response);
      expect(service.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('signIn', () => {
    it('should call service and return AuthResponseDto | null', async () => {
      const dto = { email: 'a@b.com', password: '123' };
      const response = { accessToken: 'a', refreshToken: 'b', userId: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' };
      service.signIn.mockResolvedValue(response);
      expect(await controller.signIn(dto)).toBe(response);
      expect(service.signIn).toHaveBeenCalledWith(dto);
    });
  });

  describe('refreshToken', () => {
    it('should call service and return AuthResponseDto | null', async () => {
      const response = { accessToken: 'a', refreshToken: 'b', userId: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' };
      service.refreshToken.mockResolvedValue(response);
      expect(await controller.refreshToken('token')).toBe(response);
      expect(service.refreshToken).toHaveBeenCalledWith('token');
    });
  });
});

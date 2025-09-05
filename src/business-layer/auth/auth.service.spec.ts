import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtTokenService } from './jwt/jwt.service';
import { UsersRepositoryProvider } from 'src/data-layer/providers/user.repository.provider';
import { UtilsService } from '../utils/utils.service';
import { RedisService } from '../redis/redis.service';


describe('AuthService', () => {
  let service: AuthService;
  let jwt: any, usersRepo: any, utils: any, redis: any;

  beforeEach(async () => {
    jwt = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
    };
    usersRepo = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      findById: jest.fn(),
    };
    utils = {
      comparePasswords: jest.fn(),
      hashPassword: jest.fn(),
    };
    redis = {
      set: jest.fn(),
      get: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
      { provide: JwtTokenService, useValue: jwt },
        { provide: UsersRepositoryProvider, useValue: usersRepo },
        { provide: UtilsService, useValue: utils },
        { provide: RedisService, useValue: redis },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return null if user not found', async () => {
      usersRepo.findByEmail.mockResolvedValue(null);
      expect(await service.signIn({ email: 'a', password: 'b' })).toBeNull();
    });
    it('should return null if password mismatch', async () => {
      usersRepo.findByEmail.mockResolvedValue({ id: '1', email: 'a', password: 'hashed' });
      utils.comparePasswords.mockResolvedValue(false);
      expect(await service.signIn({ email: 'a', password: 'b' })).toBeNull();
    });
    it('should return AuthResponseDto if ok', async () => {
      usersRepo.findByEmail.mockResolvedValue({ id: '1', email: 'a', password: 'hashed', firstName: 'A', lastName: 'B' });
      utils.comparePasswords.mockResolvedValue(true);
      jwt.generateAccessToken.mockReturnValue('access');
      jwt.generateRefreshToken.mockReturnValue('refresh');
      const result = await service.signIn({ email: 'a', password: 'b' });
      expect(result).toMatchObject({ accessToken: 'access', refreshToken: 'refresh', userId: '1', email: 'a', firstName: 'A', lastName: 'B' });
    });
  });

  describe('signUp', () => {
    it('should throw if user exists', async () => {
      usersRepo.findByEmail.mockResolvedValue({ id: '1' });
      await expect(service.signUp({ email: 'a', password: 'b', firstName: 'A', lastName: 'B' })).rejects.toThrow();
    });
    it('should create user and return AuthResponseDto', async () => {
      usersRepo.findByEmail.mockResolvedValue(null);
      utils.hashPassword.mockResolvedValue('hashed');
      usersRepo.createUser.mockResolvedValue({ id: '1', email: 'a', firstName: 'A', lastName: 'B' });
      jwt.generateAccessToken.mockReturnValue('access');
      jwt.generateRefreshToken.mockReturnValue('refresh');
      const result = await service.signUp({ email: 'a', password: 'b', firstName: 'A', lastName: 'B' });
      expect(result).toMatchObject({ accessToken: 'access', refreshToken: 'refresh', userId: '1', email: 'a', firstName: 'A', lastName: 'B' });
    });
  });

  describe('refreshToken', () => {
    it('should return null if verify fails', async () => {
      jwt.verifyRefreshToken.mockReturnValue(null);
      expect(await service.refreshToken('bad')).toBeNull();
    });
    it('should return null if user not found', async () => {
      jwt.verifyRefreshToken.mockReturnValue({ sub: '1' });
      usersRepo.findById.mockResolvedValue(null);
      expect(await service.refreshToken('token')).toBeNull();
    });
    it('should return AuthResponseDto if ok', async () => {
      jwt.verifyRefreshToken.mockReturnValue({ sub: '1', email: 'a' });
      usersRepo.findById.mockResolvedValue({ id: '1', email: 'a', firstName: 'A', lastName: 'B' });
      jwt.generateAccessToken.mockReturnValue('access');
      jwt.generateRefreshToken.mockReturnValue('refresh');
      const result = await service.refreshToken('token');
      expect(result).toMatchObject({ accessToken: 'access', refreshToken: 'refresh', userId: '1', email: 'a', firstName: 'A', lastName: 'B' });
    });
  });
});

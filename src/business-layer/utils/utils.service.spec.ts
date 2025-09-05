import { UtilsService } from './utils.service';
import * as bcrypt from 'bcrypt';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    service = new UtilsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password', async () => {
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt' as any);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as any);
    expect(await service.hashPassword('123')).toBe('hashed');
  });

  it('should compare passwords', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as any);
    expect(await service.comparePasswords('123', 'hashed')).toBe(true);
  });
});

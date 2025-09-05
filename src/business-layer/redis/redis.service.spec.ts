import { RedisService } from './redis.service';

describe('RedisService', () => {
  let service: RedisService;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    };
    service = new RedisService();
    // @ts-ignore
    service.client = mockClient;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set value with ttl', async () => {
    await service.set('k', 'v', 10);
    expect(mockClient.set).toHaveBeenCalledWith('k', 'v', 'EX', 10);
  });

  it('should set value without ttl', async () => {
    await service.set('k', 'v');
    expect(mockClient.set).toHaveBeenCalledWith('k', 'v');
  });

  it('should get value', async () => {
    mockClient.get.mockResolvedValue('val');
    expect(await service.get('k')).toBe('val');
  });

  it('should delete value', async () => {
    mockClient.del.mockResolvedValue(1);
    expect(await service.del('k')).toBe(1);
  });
});

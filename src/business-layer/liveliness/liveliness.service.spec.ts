import { LivelinessService } from './liveliness.service';

describe('LivelinessService', () => {
  let service: LivelinessService;

  beforeEach(() => {
    service = new LivelinessService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return OK', () => {
    expect(service.checkLiveliness()).toBe('OK');
  });
});

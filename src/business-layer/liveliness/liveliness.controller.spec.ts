import { Test, TestingModule } from '@nestjs/testing';
import { LivelinessController } from './liveliness.controller';
import { LivelinessService } from './liveliness.service';

describe('LivelinessController', () => {
  let controller: LivelinessController;
  let service: any;

  beforeEach(async () => {
    service = { checkLiveliness: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivelinessController],
      providers: [
        { provide: LivelinessService, useValue: service },
      ],
    }).compile();
    controller = module.get<LivelinessController>(LivelinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', () => {
    service.checkLiveliness.mockReturnValue('OK');
    expect(controller.checkLiveliness()).toBe('OK');
    expect(service.checkLiveliness).toHaveBeenCalled();
  });
});

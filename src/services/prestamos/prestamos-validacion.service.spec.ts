import { Test, TestingModule } from '@nestjs/testing';
import { PrestamosValidacionService } from './prestamos-validacion.service';

describe('PrestamosValidacionService', () => {
  let service: PrestamosValidacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestamosValidacionService],
    }).compile();

    service = module.get<PrestamosValidacionService>(
      PrestamosValidacionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

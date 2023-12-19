import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosValidacionService } from './movimientos-validacion.service';

describe('MovimientosValidacionService', () => {
  let service: MovimientosValidacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientosValidacionService],
    }).compile();

    service = module.get<MovimientosValidacionService>(MovimientosValidacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';

import { PrestamosController } from '@controllers/prestamos/prestamos.controller';
import { PrestamosService } from '@services/prestamos/prestamos.service';

@Module({
  controllers: [PrestamosController],
  providers: [PrestamosService],
})
export class PrestamosModule {}

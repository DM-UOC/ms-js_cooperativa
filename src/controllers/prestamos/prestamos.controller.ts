import { Controller, Body, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ExceptionFilter } from '@filters/exception-filter/exception-filter';

import { CreatePrestamoDto } from '@models/prestamos/dto/create-prestamo.dto';
import { UpdatePrestamoDto } from '@models/prestamos/dto/update-prestamo.dto';
import { ValidacionMsPrestamoDto } from '@models/prestamos/dto/validacion-ms-prestamo.dto';

import { PrestamosService } from '@services/prestamos/prestamos.service';
import { PrestamosValidacionService } from '@services/prestamos/prestamos-validacion.service';

import config from '@app/libs/config/config';

@Controller('prestamos')
@UseFilters(new ExceptionFilter())
export class PrestamosController {
  constructor(
    private readonly prestamosService: PrestamosService,
    private readonly prestamosValidacionService: PrestamosValidacionService,
  ) {}

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.prestamos.validacion,
  })
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    try {
      return this.prestamosService.create(createPrestamoDto);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.prestamos.validacion,
  })
  validacionPrestamo(@Body() validacionMsPrestamoDto: ValidacionMsPrestamoDto) {
    try {
      return this.prestamosValidacionService.validacionPrestamo(
        validacionMsPrestamoDto,
      );
    } catch (error) {
      throw error;
    }
  }
}

import { Controller, Body, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ExceptionFilter } from '@filters/exception-filter/exception-filter';

import { CreateMovimientoDto } from '@models/movimientos/dto/create-movimiento.dto';
import { VerificaRetiroMovimientoDto } from '@models/movimientos/dto/verificaretirno-ms-movimiento.dto';

import { MovimientosService } from '@services/movimientos/movimientos.service';

import config from '@app/libs/config/config';

@Controller('movimientos')
@UseFilters(new ExceptionFilter())
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.movimientos.usuario.crear,
  })
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    try {
      return this.movimientosService.create(createMovimientoDto);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.movimientos.usuario.retiro
      .verifica,
  })
  verificaRetiro(
    @Body() verificaRetiroMovimientoDto: VerificaRetiroMovimientoDto,
  ) {
    try {
      return this.movimientosService.verificaRetiro(
        verificaRetiroMovimientoDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.movimientos.usuario
      .ultimo,
  })
  ultimoMovimientoPorUsuarioId(@Body() id: string) {
    return this.movimientosService.ultimoMovimientoPorUsuarioId(id);
  }

  @MessagePattern({
    cmd: config().microservicios.cooperativa.procesos.movimientos.usuario
      .ultimo,
  })
  movimientosPorUsuarioId(@Body() id: string) {
    return this.movimientosService.ultimoMovimientoPorUsuarioId(id);
  }
}

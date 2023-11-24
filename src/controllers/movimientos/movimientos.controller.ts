import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ExceptionFilter } from '@filters/exception-filter/exception-filter';

import { CreateMovimientoDto } from '@models/movimientos/dto/create-movimiento.dto';
import { UpdateMovimientoDto } from '@models/movimientos/dto/update-movimiento.dto';

import { MovimientosService } from '@services/movimientos/movimientos.service';

@Controller('movimientos')
@UseFilters(new ExceptionFilter())
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @MessagePattern({ cmd: 'movimiento_crear_usuario' })
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimientoDto: UpdateMovimientoDto,
  ) {
    return this.movimientosService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(+id);
  }
}

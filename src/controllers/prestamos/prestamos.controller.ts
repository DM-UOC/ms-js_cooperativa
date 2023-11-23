import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreatePrestamoDto } from '@models/prestamos/dto/create-prestamo.dto';
import { UpdatePrestamoDto } from '@models/prestamos/dto/update-prestamo.dto';

import { PrestamosService } from '@services/prestamos/prestamos.service';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamosService.create(createPrestamoDto);
  }

  @Get()
  findAll() {
    return this.prestamosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestamosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamosService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }
}

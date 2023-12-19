/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';

import { CreatePrestamoDto } from '@models/prestamos/dto/create-prestamo.dto';
import { PrestamoEntity } from '@models/prestamos/entities/prestamo.entity';

import { MovimientosValidacionService } from '@services/movimientos/movimientos-validacion.service';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectModel(PrestamoEntity)
    private readonly prestamoEntity: ReturnModelType<typeof PrestamoEntity>,
    private readonly movimientosValidacionService: MovimientosValidacionService,
    private readonly configService: ConfigService,
  ) {}

  create(createPrestamoDto: CreatePrestamoDto) {
    return 'This action adds a new prestamo';
  }

}

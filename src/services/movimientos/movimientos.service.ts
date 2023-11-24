import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { CreateMovimientoDto } from '@models/movimientos/dto/create-movimiento.dto';
import { UpdateMovimientoDto } from '@models/movimientos/dto/update-movimiento.dto';
import { MovimientoEntity } from '@app/src/models/movimientos/entities/movimiento.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectModel(MovimientoEntity)
    private readonly movimientoEntity: ReturnModelType<typeof MovimientoEntity>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto) {
    try {
      // * desestructura los parámetros...
      // * recoge el usuario...
      const { id, tipo, descripcion, valor, imagen, usuario } =
        createMovimientoDto;
      // * recogemos el saldo...
      let { saldo } = createMovimientoDto;
      // * verifica si tiene registros...
      const ultimoMovimiento = await this.findOne(id);
      // * si existe registro recoge el último saldo...
      if(ultimoMovimiento) saldo = ultimoMovimiento.saldo;
      // * retornamos el objeto...
      return this.movimientoEntity.create({
        usuario_id: id,
        descripcion,
        tipo,
        valor,
        imagen,
        auditoria: {
          usuario_ingresa: usuario,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all movimientos`;
  }

  async findOne(id: string) {
    return await this.movimientoEntity.findOne({
      usuario_id: id,
      ultimo: true      
    })
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}

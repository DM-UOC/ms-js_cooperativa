import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { CreateMovimientoDto } from '@models/movimientos/dto/create-movimiento.dto';
import { UpdateMovimientoDto } from '@models/movimientos/dto/update-movimiento.dto';
import { MovimientoEntity } from '@models/movimientos/entities/movimiento.entity';
import { VerificaRetiroMovimientoDto } from '@models/movimientos/dto/verificaretirno-ms-movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectModel(MovimientoEntity)
    private readonly movimientoEntity: ReturnModelType<typeof MovimientoEntity>,
  ) {}

  private async verificaUltimoMovimiento(
    createMovimientoDto: CreateMovimientoDto,
  ) {
    try {
      // * desestructura el objeto...
      const { id, usuario } = createMovimientoDto;
      // * verifica si tiene registros...
      const ultimoMovimiento = await this.findOne(id);
      // * si existe registro recoge el último saldo...
      if (!ultimoMovimiento) return; // * no hace nada al no encontrar registros...
      // * recoge el último saldo y agrega la propiedad...
      createMovimientoDto['saldo'] = ultimoMovimiento.saldo;
      // * acttualiza el último movimiento su bandera último a false...
      await this.movimientoEntity.findByIdAndUpdate(
        {
          _id: ultimoMovimiento._id,
        },
        {
          $set: {
            ultimo: false,
            auditoria: {
              fecha_actualiza: new Date(),
              usuario_actualiza: usuario,
            },
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  private verificaOperacionSaldo(createMovimientoDto: CreateMovimientoDto) {
    try {
      // * desestructura el tipo de movimiento...
      const { tipo, valor } = createMovimientoDto;
      // * verifica...
      if (tipo === 'DEP') return createMovimientoDto.saldo + +valor;
      // * retorna la operación...
      return createMovimientoDto.saldo - +valor;
    } catch (error) {
      throw error;
    }
  }

  async create(createMovimientoDto: CreateMovimientoDto) {
    try {
      // * desestructura los parámetros...
      // * recoge el usuario...
      const { id, tipo, descripcion, valor, imagen, usuario } =
        createMovimientoDto;
      // * proceso de chequeo de último registro...
      await this.verificaUltimoMovimiento(createMovimientoDto);
      // * retornamos el valor del saldo...
      const saldo = this.verificaOperacionSaldo(createMovimientoDto);
      // * retornamos el objeto...
      return this.movimientoEntity.create({
        usuario_id: id,
        descripcion,
        tipo,
        valor,
        saldo,
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

  async findOne(usuario_id: string) {
    return await this.movimientoEntity.findOne({
      usuario_id,
      ultimo: true,
    });
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }

  verificaRetiro(verificaRetiroMovimientoDto: VerificaRetiroMovimientoDto) {
    try {
      // * desestructura el objeto...
      const { usuario_id, valor } = verificaRetiroMovimientoDto;
    } catch (error) {
      throw error;
    }
  }
}

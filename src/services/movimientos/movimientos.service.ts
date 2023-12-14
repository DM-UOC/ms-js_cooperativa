import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';
import { ObjectId, Types } from 'mongoose';

import { CreateMovimientoDto } from '@models/movimientos/dto/create-movimiento.dto';
import { UpdateMovimientoDto } from '@models/movimientos/dto/update-movimiento.dto';
import { MovimientoEntity } from '@models/movimientos/entities/movimiento.entity';
import { VerificaRetiroMovimientoDto } from '@models/movimientos/dto/verificaretirno-ms-movimiento.dto';
import { AceptarRetiroMovimientoDto } from '@models/movimientos/dto/aceptar.retiro-movimiento.dto';
import { EliminarRetiroMovimientoDto } from '@models/movimientos/dto/eliminar.retiro-movimiento.dto';

import { UtilitariosService } from '@services/utilitarios/utilitarios.service';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectModel(MovimientoEntity)
    private readonly movimientoEntity: ReturnModelType<typeof MovimientoEntity>,
    private readonly configService: ConfigService,
  ) {}

  private async cambiaUltimoEstadoPorMovimientoId(
    _id: ObjectId,
    usuario: string,
  ) {
    try {
      // * acttualiza el último movimiento su bandera último a false...
      await this.movimientoEntity.findByIdAndUpdate(
        {
          _id,
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

  private verificaOperacionSaldo(
    saldo: number,
    tipo: string,
    valor: number,
  ): number {
    try {
      // * verifica...
      if (tipo === 'DEP') return saldo + +valor;
      // * retorna la operación...
      return saldo - +valor;
    } catch (error) {
      throw error;
    }
  }

  private async retornaUltimoMovimiento(
    _id: string,
  ): Promise<MovimientoEntity> {
    // * retorna tiene registros...
    return await this.findOne({
      'usuario.id': _id,
      ultimo: true,
    });
  }

  private retornaUltimoSaldoPorMovimiento(
    movimientoEntity: MovimientoEntity,
  ): number {
    try {
      // * si el ultimo saldo es > 0 se asigna el nuevo parametro de saldo...
      if (movimientoEntity) return movimientoEntity.saldo;
      // * si el objeto es nulll retorna 0
      return 0;
    } catch (error) {
      throw error;
    }
  }

  private async creaMovimeinto(
    saldo: number,
    createMovimientoDto: CreateMovimientoDto,
  ): Promise<MovimientoEntity> {
    try {
      // * desestructura los parámetros...
      const {
        id,
        tipo,
        descripcion,
        aprobado,
        valor,
        imagen,
        usuario,
        nombres,
      } = createMovimientoDto;
      // * crea un movimiento...
      return await this.movimientoEntity.create({
        usuario: {
          id,
          identificacion: usuario,
          nombre_completo: nombres,
        },
        descripcion,
        tipo,
        valor,
        saldo,
        aprobado,
        imagen,
        auditoria: {
          usuario_ingresa: usuario,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(createMovimientoDto: CreateMovimientoDto) {
    try {
      // * desestructura los parámetros...
      const { id, tipo, valor, usuario } = createMovimientoDto;
      // * retorna el ultimo saldo de un registro activo de movimiento...
      const ultimoMovimientoEntity: MovimientoEntity =
        await this.retornaUltimoMovimiento(id);
      // * recoge el último saldo...
      createMovimientoDto['saldo'] = this.retornaUltimoSaldoPorMovimiento(
        ultimoMovimientoEntity,
      );
      // * actualiza a false el resto de movimientos...
      if (ultimoMovimientoEntity)
        await this.cambiaUltimoEstadoPorMovimientoId(
          ultimoMovimientoEntity._id,
          usuario,
        );
      // * retornamos el valor del saldo...
      const saldo = this.verificaOperacionSaldo(
        createMovimientoDto['saldo'],
        tipo,
        +valor,
      );
      // * retornamos el objeto...
      return await this.creaMovimeinto(saldo, createMovimientoDto);
    } catch (error) {
      throw error;
    }
  }

  async crearRetiro(createMovimientoDto: CreateMovimientoDto) {
    try {
      // * desestructura los parámetros...
      const { id, tipo, descripcion, aprobado, valor, usuario, nombres } =
        createMovimientoDto;
      // * retornamos el objeto...
      return this.movimientoEntity.create({
        usuario: {
          id,
          identificacion: usuario,
          nombre_completo: nombres,
        },
        descripcion,
        tipo,
        valor,
        aprobado,
        ultimo: false,
        auditoria: {
          usuario_ingresa: usuario,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async aceptarRetiro(aceptarRetiroMovimientoDto: AceptarRetiroMovimientoDto) {
    try {
      // * desestructura el objeto argumento...
      const { _id, observacion, usuario, imagen, aprobado } =
        aceptarRetiroMovimientoDto;
      // * retorna información del movimiento actual...
      const movimientoRetiroEntity = await this.findOne({
        _id: new Types.ObjectId(_id),
      });
      // * retorna el ultimo saldo de un registro activo de movimiento...
      const ultimoMovimientoEntity: MovimientoEntity =
        await this.retornaUltimoMovimiento(movimientoRetiroEntity.usuario.id);
      // * recoge el último saldo...
      aceptarRetiroMovimientoDto['saldo'] =
        this.retornaUltimoSaldoPorMovimiento(ultimoMovimientoEntity);
      // * actualizamos el registro....
      // * retornamos el valor del saldo...
      movimientoRetiroEntity.saldo = this.verificaOperacionSaldo(
        aceptarRetiroMovimientoDto['saldo'],
        movimientoRetiroEntity.tipo,
        movimientoRetiroEntity.valor,
      );
      // * cambia a false los est
      await this.cambiaUltimoEstadoPorMovimientoId(
        ultimoMovimientoEntity._id,
        usuario,
      );
      // * seteamos como movimiento aprobado...
      movimientoRetiroEntity.imagen = imagen;
      // * seteamos como movimiento aprobado...
      movimientoRetiroEntity.aprobado = aprobado;
      // * seteamos como último movimiento...
      movimientoRetiroEntity.ultimo = true;
      // * observacion...
      movimientoRetiroEntity.observacion = observacion;
      // * auditoria...
      movimientoRetiroEntity.auditoria = {
        fecha_actualiza: UtilitariosService.retornaFechaActualPersistencia(),
        usuario_actualiza: usuario,
      };
      // * retorna el documento...
      return await movimientoRetiroEntity.save();
    } catch (error) {
      throw error;
    }
  }

  async eliminarRetiro(
    eliminarRetiroMovimientoDto: EliminarRetiroMovimientoDto,
  ) {
    try {
      // * desestructura el parametro objeto...
      const { _id, observacion, usuario } = eliminarRetiroMovimientoDto;
      // * retorna información del movimiento actual...
      const movimientoRetiroEntity = await this.findOne({
        _id: new Types.ObjectId(_id),
      });
      // * observacion...
      movimientoRetiroEntity.observacion = observacion;
      // * auditoria...
      movimientoRetiroEntity.auditoria = {
        fecha_actualiza: UtilitariosService.retornaFechaActualPersistencia(),
        usuario_actualiza: usuario,
      };
      // * retorna el objeto en estado eliminado...
      return await movimientoRetiroEntity.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    // * retornando resultados...
    return await this.movimientoEntity.find({
      'usuario.id': id,
      'auditoria.activo': true,
    });
  }

  async findOne(filtro: object) {
    // * busca un único resultado por filtro...
    return await this.movimientoEntity.findOne(filtro);
  }

  async ultimoMovimientoPorUsuarioId(id: string) {
    // * retorna el usuario...
    return await this.movimientoEntity.findOne({
      'usuario.id': id,
      ultimo: true,
      'auditoria.activo': true,
    });
  }

  async movimientoPorUsuarioId(id: string) {
    // * retorna el usuario...
    return await this.findAll(id);
  }

  private async retornaConsultaAggregate(
    arregloAggregate: Array<any>,
  ): Promise<MovimientoEntity[]> {
    try {
      return await this.movimientoEntity.aggregate(arregloAggregate);
    } catch (error) {
      throw error;
    }
  }

  private retornaConsultaAggregateTipoMovimientos(
    tipoMovimiento = 'ret',
  ): Array<any> {
    return [
      {
        $match: {
          tipo: {
            $regex: tipoMovimiento,
            $options: 'i',
          },
          'auditoria.activo': true,
        },
      },
      {
        $lookup: {
          from: 'usuarios',
          let: {
            userId: { $toObjectId: '$usuario.id' },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userId'],
                },
              },
            },
          ],
          as: 'usuario_info',
        },
      },
      {
        $project: {
          usuario: 1,
          descripcion: 1,
          tipo_movimiento: 1,
          tipo_descripcion: 1,
          aprobado: 1,
          saldo: 1,
          valor: 1,
          imagen: 1,
          auditoria: 1,
          usuario_info: {
            nombre_completo: 1,
          },
        },
      },
    ];
  }

  async retornaMovimientosPorTipo(tipo = 'ret') {
    try {
      // * filtro de búsqueda...
      const filtro = this.retornaConsultaAggregateTipoMovimientos(tipo);
      // * retorna el consulta retiros...
      return await this.retornaConsultaAggregate(filtro);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }

  async verificaRetiro(
    verificaRetiroMovimientoDto: VerificaRetiroMovimientoDto,
  ) {
    try {
      const tipoTransaccion = this.configService.get<string>(
        'microservicios.cooperativa.movimientos.transaccion.retiro',
      );
      // * desestructura el objeto...
      const { usuario_id, tipo, valor } = verificaRetiroMovimientoDto;
      // * se ejecuta la validación si es retiro...
      if (tipo.toLowerCase() !== tipoTransaccion.toLowerCase()) return null;
      // * retorna la última transacción del usuario...
      const movimientoEntity = await this.findOne({
        'usuario.id': usuario_id,
        ultimo: true,
      });
      // * si no tiene movimientos... no puede realizar un retiro
      if (!movimientoEntity) return { autorizado: true };
      // * verifica si el valor no es mayo al saldo...
      if (movimientoEntity.saldo <= +valor) return { autorizado: true };
      // * no es mayor y puede retirar...
      return null;
    } catch (error) {
      throw error;
    }
  }
}

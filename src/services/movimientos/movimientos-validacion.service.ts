import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';

import { MovimientoEntity } from '@models/movimientos/entities/movimiento.entity';

@Injectable()
export class MovimientosValidacionService {
  constructor(
    @InjectModel(MovimientoEntity)
    private readonly movimientoEntity: ReturnModelType<typeof MovimientoEntity>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(filtro: object) {
    // * busca un único resultado por filtro...
    return await this.movimientoEntity.findOne(filtro);
  }

  async validacionMontoPrestamo(valor_solicitado: number, usuario_id: string) {
    // * filtro de busqueda...
    const filtro = {
      'usuario.id': usuario_id,
      ultimo: true,
    };
    // * retorna el movimiento...
    const movimientoUsuarioEntity = await this.findOne(filtro);
    /**
     * ! AQUI DEBE LLAMARSE A LA CONFIGURACIÓN PARA TRAAER DATO DE CANTIDAD DEPOSITADO PARA PRÉSTAMO
     * ! PARA PEDIR EL PRÉSTAMO SE DEBE TENER 3 VECES DE LO QUE SE TIENE DEPOSITADO...
     * ! EJEMPLO: SOLICITA 100 USD, LO DEPOSITADO DEBE TENER 300
     */
    const valorSolicitado = valor_solicitado * 3; // ? aquí debería traer el valor de configuración...
    // * si el valor solicitado supera o es 3 veces a los depositado puede contitnuar con la solicitud...
    if (valorSolicitado >= movimientoUsuarioEntity.saldo) return false;
    // * el saldo es mayor a lo solicitado... puede contitnuar...
    return true;
  }
}

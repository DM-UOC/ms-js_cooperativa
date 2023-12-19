/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';

import { PrestamoEntity } from '@models/prestamos/entities/prestamo.entity';
import { ValidacionMsPrestamoDto } from '@models/prestamos/dto/validacion-ms-prestamo.dto';

import { MovimientosValidacionService } from '@services/movimientos/movimientos-validacion.service';

@Injectable()
export class PrestamosValidacionService {
  constructor(
    @InjectModel(PrestamoEntity)
    private readonly prestamoEntity: ReturnModelType<typeof PrestamoEntity>,
    private readonly movimientosValidacionService: MovimientosValidacionService,
    private readonly configService: ConfigService,
  ) {}

  async retornaPrestamoPorUsuarioId(filtro: object) {
    // * retorna objeto único...
    return await this.prestamoEntity.findOne(filtro);
  }

  private verificaPrestamoTerminadoUsuario(prestamoEntity: PrestamoEntity) {
    try {
      // *  verifica si el préstamo está activo...
      const { administrador } = prestamoEntity;
      // * si está activo retorna error...
      if (!administrador.terminado) return !administrador.terminado;
      // * puede pedir préstamo...
      return administrador.terminado;
    } catch (error) {
      throw error;
    }
  }

  async validacionPrestamo(validacionMsPrestamoDto: ValidacionMsPrestamoDto) {
    try {
      // * desestructura el objeto...
      const { valor, usuario_id } = validacionMsPrestamoDto;
      // * retorna el objeto úlitmo objeto prestamo...
      const prestamoUsuarioEntity = await this.retornaPrestamoPorUsuarioId({
        'usuario.id': usuario_id,
      });
      // * si el objeto es null no hay prestamo activo...
      if (!prestamoUsuarioEntity) return null;
      // * empieza la validacion...
      // * si tiene prestamos activos...
      if (!this.verificaPrestamoTerminadoUsuario(prestamoUsuarioEntity))
        return { noAutorizado: true };
      // * si monto solicitado no supera el valor depositado...
      if (!this.movimientosValidacionService.validacionMontoPrestamo(parseFloat(valor),usuario_id)) return { noAutorizado: true };
    } catch (error) {
      throw error;
    }
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';

import { PrestamoEntity } from '@models/prestamos/entities/prestamo.entity';
import { ValidacionMsPrestamoDto } from '@models/prestamos/dto/validacion-ms-prestamo.dto';

import { MovimientosValidacionService } from '@services/movimientos/movimientos-validacion.service';
import { UtilitariosService } from '../utilitarios/utilitarios.service';

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

  private validacionExistenciaPrestamo(errores: string[]) {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  async validacionPrestamo(validacionMsPrestamoDto: ValidacionMsPrestamoDto) {
    try {
      const errores = {
        montoErrores: {
          monto: []
        }
      }
      // * desestructura el objeto...
      const { monto, usuario_id } = validacionMsPrestamoDto;
      // * retorna el objeto úlitmo objeto prestamo...
      const prestamoUsuarioEntity = await this.retornaPrestamoPorUsuarioId({
        'usuario.id': usuario_id,
      });
      // * verifica monto solicitado vs depositado...
      const cumpleDeposito = await this.movimientosValidacionService.validacionMontoPrestamo(UtilitariosService.retornaFormatoNumerico(monto), usuario_id);
      // * si monto solicitado no supera el valor depositado...
      if (!cumpleDeposito) errores.montoErrores.monto.push("¡El monto solicitado no cumple con el requisito de tener 3 veces lo depositado contra el monto solicitado! Verifique.");
      // * empieza la validacion...
      // * si tiene prestamos activos...
      if(prestamoUsuarioEntity) if (!this.verificaPrestamoTerminadoUsuario(prestamoUsuarioEntity)) errores.montoErrores.monto.push("Usted tiene un préstamo activo");
      // * retornamos los errores sobre el monto...
      // * validamos si el arreglo de errores contiene información, caso contrario retorna null...
      if(errores.montoErrores.monto.length === 0) return null;
      // * existe errores, devuelve el objeto...
      return errores;
    } catch (error) {
      throw error;
    }
  }
}

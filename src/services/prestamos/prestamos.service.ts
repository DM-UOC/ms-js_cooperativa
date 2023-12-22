/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';

import { CreatePrestamoDto } from '@models/prestamos/dto/create-prestamo.dto';
import { PrestamoEntity } from '@models/prestamos/entities/prestamo.entity';

import { MovimientosValidacionService } from '@services/movimientos/movimientos-validacion.service';
import { DatosSimuladorPrestamoDto } from '@app/src/models/prestamos/dto/datos-simulador-prestamo.dto';
import { UtilitariosService } from '../utilitarios/utilitarios.service';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectModel(PrestamoEntity)
    private readonly prestamoEntity: ReturnModelType<typeof PrestamoEntity>,
    private readonly movimientosValidacionService: MovimientosValidacionService,
    private readonly configService: ConfigService,
  ) {}

  async registraCredito(createPrestamoDto: CreatePrestamoDto) {
    try {
      // * desestructura el objeto...
      const { tiempo, monto, descripcion, id, nombres, usuario} = createPrestamoDto;
      // * crea el documento...
      return await this.prestamoEntity.create({
        usuario: {
          id,
          identificacion: usuario,
          nombre_completo: nombres
        },
        monto,
        tiempo,
        descripcion,
        auditoria: {
          usuario_ingresa: usuario,
        }
      });      
    } catch (error) {
      throw error;
    }
  }

  private generaArregloSimulador(datosSimuladorPrestamoDto: DatosSimuladorPrestamoDto) {
    return [];
  }

  private async procesaCalculoSimulador(createPrestamoDto: CreatePrestamoDto) {
    try {
      // * sesetructura el parámetro...
      const { monto, tiempo } = createPrestamoDto;
      // * calculamos el valor a pagar mediate parametros y aplicación de formula...
      // * interes mensual...
      const totalInteresMensual = monto * 0.06 * tiempo;
      const valorInteresMensual = UtilitariosService.retornaValorPrecisionDecimales(totalInteresMensual / tiempo);
      // * aporte cooperativa...
      const totalInteresAporte = monto * 0.02 * tiempo;
      const valorInteresAporte = UtilitariosService.retornaValorPrecisionDecimales(totalInteresMensual / tiempo);
      // * total de sumatoria de intereses...
      const sumatoriaIntereses = totalInteresMensual + totalInteresAporte;
      // * total capitalizado monto + intereses...
      const sumatoriaCapitalizado = UtilitariosService.retornaValorPrecisionDecimales(sumatoriaIntereses + monto);
      const valorMensualCapitalizado = UtilitariosService.retornaValorPrecisionDecimales(monto / tiempo);
      // * valor aporte libreta ahorros...
      const valorDepositoMensual = 5 * tiempo;
      // * generamos el arreglo...
      const arregloSimulador = this.generaArregloSimulador(new DatosSimuladorPrestamoDto(
        monto, sumatoriaCapitalizado, valorMensualCapitalizado, valorInteresMensual, valorInteresAporte, tiempo))
    } catch (error) {
      throw error;
    }
  }

  async create(createPrestamoDto: CreatePrestamoDto) {
    try {
      // * crea datos del préstamo a estado temporal...

      // * retorna registro...
      return await this.registraCredito(createPrestamoDto);
    } catch (error) {
      throw error;
    }
  }

}

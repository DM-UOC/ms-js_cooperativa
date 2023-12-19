import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { PrestamosController } from '@controllers/prestamos/prestamos.controller';

import { MovimientosModule } from '@modules/movimientos/movimientos.module';

import { PrestamoEntity } from '@models/prestamos/entities/prestamo.entity';

import { PrestamosService } from '@services/prestamos/prestamos.service';
import { PrestamosValidacionService } from '@services/prestamos/prestamos-validacion.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        {
          typegooseClass: PrestamoEntity,
          schemaOptions: {
            collection: 'prestamos',
            versionKey: false,
          },
        },
      ],
      config().servidor.mongo.coopeartiva.nombre,
    ),
    ConfigModule,
    MovimientosModule,
  ],
  controllers: [PrestamosController],
  providers: [PrestamosService, PrestamosValidacionService],
})
export class PrestamosModule {}

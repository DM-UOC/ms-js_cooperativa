import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { MovimientosController } from '@controllers/movimientos/movimientos.controller';
import { MovimientoEntity } from '@models/movimientos/entities/movimiento.entity';
import { MovimientosService } from '@services/movimientos/movimientos.service';
import { MovimientosValidacionService } from '@services/movimientos/movimientos-validacion.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        {
          typegooseClass: MovimientoEntity,
          schemaOptions: {
            collection: 'movimientos',
            versionKey: false,
          },
        },
      ],
      config().servidor.mongo.coopeartiva.nombre,
    ),
    ConfigModule,
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService],
  exports: [MovimientosValidacionService],
})
export class MovimientosModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { PrestamosController } from '@controllers/prestamos/prestamos.controller';

import { PrestamoEntity } from '@app/src/models/prestamos/entities/prestamo.entity';

import { PrestamosService } from '@services/prestamos/prestamos.service';

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
  ],
  controllers: [PrestamosController],
  providers: [PrestamosService],
})
export class PrestamosModule {}

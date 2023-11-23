import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongoModule } from '@modules/mongo/mongo.module';
import { MovimientosModule } from '@modules/movimientos/movimientos.module';
import { PrestamosModule } from '@modules/prestamos/prestamos.module';

@Module({
  imports: [MongoModule, MovimientosModule, PrestamosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

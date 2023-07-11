import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import config from '@app/libs/config/config';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      connectionName: config().servidor.mongo.coopeartiva.nombre,
      useFactory: async () => ({
        uri: `mongodb://${process.env[config().servidor.mongo.coopeartiva.usuario]}:${process.env[config().servidor.mongo.coopeartiva.clave]}@${process.env[config().servidor.mongo.coopeartiva.direccion]}:${process.env[config().servidor.mongo.coopeartiva.puerto]}/${process.env[config().servidor.mongo.coopeartiva.basedatos]}?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`
      })
    }),    
  ]  
})
export class MongoModule {}

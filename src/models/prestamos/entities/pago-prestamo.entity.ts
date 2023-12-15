import { prop } from '@typegoose/typegoose';

export class PagoPrestamoEntity {
  @prop({ default: new Date() })
  fecha_registro: Date;
}

import { prop } from '@typegoose/typegoose';

export class AuditoriaEntity {
  @prop({ default: true })
  activo?: boolean;
  @prop({ default: new Date() })
  fecha_ingresa?: Date;
  @prop()
  usuario_ingresa?: string;
  @prop()
  fecha_actualiza?: Date;
  @prop()
  usuario_actualiza?: string;
}

import { prop } from '@typegoose/typegoose';

export class SimuladorEntity {
  @prop({})
  fecha_aproximada_pago?: Date;
  @prop({ default: 0 })
  valor_calculado?: number;
  @prop({ default: [] })
  valores_extras?: number[];
}

/* eslint-disable prettier/prettier */
import { pre, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';
import { ImagenEntity } from '@models/comun/entities/imagen.entity';
import {
  ENUM_IDENTICADOR_MOVIMIENTOS,
  ENUM_MOVIMIENTOS,
} from './enum.movimiento';

@pre<MovimientoEntity>('save', function() {
  if (this.tipo === 'DEP') this.tipo_movimiento = ENUM_IDENTICADOR_MOVIMIENTOS.INGRESO;
  if (this.tipo === 'RET') this.tipo_movimiento = ENUM_IDENTICADOR_MOVIMIENTOS.EGRESO;
})

export class MovimientoEntity {
  readonly _id: ObjectId;
  @prop()
  usuario_id!: string;
  @prop({ trim: true })
  descripcion: string;
  @prop({ default: 0 })
  saldo: number;
  @prop({ default: 0 })
  valor: number;
  @prop({ enum: ENUM_MOVIMIENTOS })
  tipo: ENUM_MOVIMIENTOS;
  @prop({ enum: ENUM_IDENTICADOR_MOVIMIENTOS })
  tipo_movimiento: ENUM_IDENTICADOR_MOVIMIENTOS;
  @prop({ type: ImagenEntity, _id: false })
  imagen?: ImagenEntity;
  @prop({ default: true })
  aprobado: boolean;
  @prop({ default: true })
  ultimo: boolean;
  @prop({ type: AuditoriaEntity, _id: false, default: new AuditoriaEntity() })
  auditoria?: AuditoriaEntity;

}

/* eslint-disable prettier/prettier */
import { pre, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';
import { ImagenEntity } from '@models/comun/entities/imagen.entity';
import {
  ENUM_IDENTICADOR_MOVIMIENTOS,
  ENUM_MOVIMIENTOS,
  ENUM_MOVIMIENTOS_DESCRIPCION,
} from './enum.movimiento';
import { IsNumber } from 'class-validator';

function seteaPropiedadesIngreso(ref: MovimientoEntity) {
  // * identificadores de movimiento...
  ref.tipo_movimiento = ENUM_IDENTICADOR_MOVIMIENTOS.INGRESO;
  ref.tipo_descripcion = ENUM_MOVIMIENTOS_DESCRIPCION.DEPOSTIO;
}

function seteaPropiedadesEgreso(ref: MovimientoEntity) {
  // * identificadores de movimiento...
  ref.tipo_movimiento = ENUM_IDENTICADOR_MOVIMIENTOS.EGRESO;
  ref.tipo_descripcion = ENUM_MOVIMIENTOS_DESCRIPCION.RETIRO;
}


@pre<MovimientoEntity>('save', function() {
  if (this.tipo === 'DEP') seteaPropiedadesIngreso(this);
  if (this.tipo === 'RET') seteaPropiedadesEgreso(this);
})

export class MovimientoEntity {
  readonly _id: ObjectId;
  @prop()
  usuario_id!: string;
  @prop({ trim: true })
  descripcion: string;
  @IsNumber()
  @prop({ default: 0 })
  saldo: number;
  @IsNumber()
  @prop({ default: 0 })
  valor: number;
  @prop({ enum: ENUM_MOVIMIENTOS })
  tipo: ENUM_MOVIMIENTOS;
  @prop({ enum: ENUM_IDENTICADOR_MOVIMIENTOS })
  tipo_movimiento: ENUM_IDENTICADOR_MOVIMIENTOS;
  @prop({ enum: ENUM_MOVIMIENTOS_DESCRIPCION })
  tipo_descripcion: ENUM_MOVIMIENTOS_DESCRIPCION;  
  @prop({ type: ImagenEntity, _id: false })
  imagen?: ImagenEntity;
  @prop({ default: true })
  aprobado: boolean;
  @prop({ default: true })
  ultimo: boolean;
  @prop({ type: AuditoriaEntity, _id: false, default: new AuditoriaEntity() })
  auditoria?: AuditoriaEntity;

}

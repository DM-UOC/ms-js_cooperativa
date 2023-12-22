import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

import {
  ENUM_DESCRIPCION_OPERACION,
  ENUM_SIGLAS_OPERACION,
  ENUM_SIGNO_OPERACION,
} from './enum.prestamo';

export class FormulaEntity {
  readonly _id: ObjectId;
  @prop()
  descripcion?: string; // * descripcion de la formula "cálculo de intereses por préstamo 0.06"
  @prop({ default: 0 })
  valor?: number; // * valor numérico para ser calculado
  @prop({ enum: ENUM_DESCRIPCION_OPERACION })
  descripcion_operacion?: ENUM_DESCRIPCION_OPERACION; // * porcentaje, suma, resta, multiplicacion
  @prop({ enum: ENUM_SIGLAS_OPERACION })
  siglas_operacion?: ENUM_SIGLAS_OPERACION; // * porcentaje, suma, resta, multiplicacion
  @prop({ enum: ENUM_SIGNO_OPERACION })
  signo_operacion?: ENUM_SIGNO_OPERACION; // +,/,*,-
  @prop({ default: false })
  activo?: boolean; // boolean si está activo o inactivo, true = activo, false = inactivo
}

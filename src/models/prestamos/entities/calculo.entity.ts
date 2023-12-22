import { ObjectId } from 'mongoose';
import { prop } from '@typegoose/typegoose';

import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';
import { FormulaEntity } from './formula.entity';

export class CalculoEntity {
  readonly _id: ObjectId;
  @prop({})
  descripcion?: string; // * descripcion para la formula "calculo porcentaje cobro por mes para préstamos"
  @prop({ type: FormulaEntity, default: [] })
  formulas: FormulaEntity[]; // * referencia objeto formulas que
  @prop({ default: false })
  activo: boolean; // * boolean true-> activo, false-> inactivo
  @prop({ type: AuditoriaEntity, default: new AuditoriaEntity(), _id: false })
  auditoria: AuditoriaEntity; // * auditoria del documento...
}

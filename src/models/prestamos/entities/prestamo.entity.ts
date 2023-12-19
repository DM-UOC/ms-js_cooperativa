import { prop } from '@typegoose/typegoose';

import { UsuarioMovimientoEntity } from '@models/usuarios/entities/usuario.movimiento.entity';
import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';
import { SimuladorEntity } from './simulador.entity';
import { AdministradorPrestamoEntity } from './administrador-prestamo.entity';

export class PrestamoEntity {
  readonly id: string;
  @prop({
    type: UsuarioMovimientoEntity,
    _id: false,
    default: new UsuarioMovimientoEntity(),
  })
  usuario!: UsuarioMovimientoEntity;
  @prop({ default: new Date() })
  fecha_solicitud?: Date;
  @prop({})
  monto!: number;
  @prop({})
  tiempo!: number;
  @prop({ type: SimuladorEntity, _id: false, default: new SimuladorEntity() })
  simuladores?: SimuladorEntity[];
  @prop({ default: '' })
  descripcion!: string;
  @prop({
    _id: false,
    type: AdministradorPrestamoEntity,
    default: new AdministradorPrestamoEntity(),
  })
  administrador?: AdministradorPrestamoEntity;
  @prop({ type: AuditoriaEntity, _id: false, default: new AuditoriaEntity() })
  auditoria?: AuditoriaEntity;
}

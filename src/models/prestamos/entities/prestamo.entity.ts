import { prop } from '@typegoose/typegoose';

import { UsuarioMovimientoEntity } from '@models/usuarios/entities/usuario.movimiento.entity';
import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';
import { SimuladorEntity } from './simulador.entity';
import { ImagenEntity } from '@models/comun/entities/imagen.entity';

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
  @prop({ type: SimuladorEntity, _id: false })
  simuladores?: SimuladorEntity[];
  @prop({ default: '' })
  descripcion_usu!: string;
  @prop({ default: '' })
  observacion_adm?: string;
  @prop({ default: true })
  aprobado: boolean;
  @prop({ type: ImagenEntity, _id: false, default: new ImagenEntity() })
  imagen?: ImagenEntity;
  @prop({ type: AuditoriaEntity, _id: false, default: new AuditoriaEntity() })
  auditoria?: AuditoriaEntity;
}

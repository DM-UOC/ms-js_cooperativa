import { prop } from '@typegoose/typegoose';

import { ImagenEntity } from '@models/comun/entities/imagen.entity';
import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';

export class AdministradorPrestamoEntity {
  @prop({ default: '' })
  nombre_completo?: string;
  @prop({})
  fecha_aprobacion?: Date;
  @prop({ default: false })
  aprobado?: boolean;
  @prop({ default: false })
  terminado?: boolean;
  @prop({ type: ImagenEntity, _id: false, default: new ImagenEntity() })
  imagen?: ImagenEntity;
  @prop({ type: AuditoriaEntity, _id: false, default: new AuditoriaEntity() })
  auditoria?: AuditoriaEntity;
}

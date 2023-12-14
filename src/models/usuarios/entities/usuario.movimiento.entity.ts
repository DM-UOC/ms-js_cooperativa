import { prop } from '@typegoose/typegoose';

export class UsuarioMovimientoEntity {
  @prop()
  id!: string;
  @prop()
  identificacion!: string;
  @prop()
  nombre_completo!: string;
}

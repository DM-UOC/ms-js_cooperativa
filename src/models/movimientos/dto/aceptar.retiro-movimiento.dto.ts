import { IsInt, IsNumber } from 'class-validator';

import { ImagenEntity } from '@models/comun/entities/imagen.entity';

export class AceptarRetiroMovimientoDto {
  readonly _id: string;
  readonly aprobado: boolean;
  readonly observacion: string;
  readonly imagen: ImagenEntity;
}

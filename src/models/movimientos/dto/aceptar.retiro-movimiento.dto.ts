import { IsInt, IsNumber } from 'class-validator';

import { ImagenEntity } from '@models/comun/entities/imagen.entity';

export class AceptarRetiroMovimientoDto {
  readonly _id: string;
  readonly aprobado: boolean;
  readonly observacion: string;
  readonly imagen: ImagenEntity;
  readonly id: string; // * dato del token de autorización...
  readonly usuario: string; // * dato del token de autorización...
  readonly nombres: string; // * dato del token de autorización...
}

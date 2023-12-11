import { IsInt, IsNumber } from 'class-validator';

import { ImagenEntity } from '@models/comun/entities/imagen.entity';

export class CreateMovimientoDto {
  readonly id: string; // * dato del token de autorización...
  readonly tipo: string;
  readonly descripcion: string;
  readonly aprobado: boolean;
  @IsInt()
  readonly valor: string;
  readonly imagen: ImagenEntity;
  readonly usuario: string; // * dato del token de autorización...
  readonly nombres: string; // * dato del token de autorización...
  @IsInt()
  saldo = 0;
}

import { IsInt, IsNumber } from 'class-validator';

import { ImagenEntity } from '@models/comun/entities/imagen.entity';

export class CreateMovimientoDto {
  readonly id: string;
  readonly tipo: string;
  readonly descripcion: string;
  readonly aprobado: boolean;
  @IsInt()
  readonly valor: string;
  readonly imagen: ImagenEntity;
  readonly usuario: string;
  @IsInt()
  saldo = 0;
}

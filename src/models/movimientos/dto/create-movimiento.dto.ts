import { IsInt, IsNumber } from 'class-validator';

export class CreateMovimientoDto {
  readonly id: string;
  readonly tipo: string;
  readonly descripcion: string;
  @IsInt()
  readonly valor: string;
  readonly imagen: any;
  readonly usuario: string;
  @IsInt()
  saldo = 0;
}

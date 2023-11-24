export class CreateMovimientoDto {
  readonly id: string;
  readonly tipo: string;
  readonly descripcion: string;
  readonly valor: number;
  readonly imagen: string;
  readonly usuario: string;
  saldo: number = 0;
}

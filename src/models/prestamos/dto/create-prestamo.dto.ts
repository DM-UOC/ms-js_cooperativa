import { SimuladorDto } from './simulador.dto';

export class CreatePrestamoDto {
  readonly monto: number;
  readonly tiempo: number;
  readonly descripcion: string;
  readonly id: string; // * dato del token de autorización...
  readonly usuario: string; // * dato del token de autorización...
  readonly nombres: string; // * dato del token de autorización...
  simuladores: SimuladorDto[];
}

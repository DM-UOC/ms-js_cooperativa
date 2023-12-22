export class SimuladorDto {
  fecha_pago?: Date;
  valor?: number;
  interes?: {
    tipo?: number;
    valor?: number;
  }[];
}

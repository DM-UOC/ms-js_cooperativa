export class DatosSimuladorPrestamoDto {
  // * propiedades...
  private monto_real: number;
  private monto_capitalizado: number;
  private monto_real_mensual: number;
  private interes_mensual: number;
  private aporte_mensual: number;
  private tiempo: number;
  // * constructor...
  constructor(
    monto_real: number,
    monto_capitalizado: number,
    monto_real_mensual: number,
    interes_mensual: number,
    aporte_mensual: number,
    tiempo: number,
  ) {
    this.monto_real = monto_real;
    this.monto_capitalizado = monto_capitalizado;
    this.monto_real_mensual = monto_real_mensual;
    this.interes_mensual = interes_mensual;
    this.aporte_mensual = aporte_mensual;
    this.tiempo = tiempo;
  }
}

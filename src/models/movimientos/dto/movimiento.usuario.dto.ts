import { ObjectId } from 'mongoose';

/* eslint-disable prettier/prettier */
export class MovimientoUsuarioDto {
  _id?: ObjectId; // * ObjectId("6560f13e7261dc88f2a16c4e"),
  descripcion?: string; // * "dep 150",
  saldo?: number; // * NumberInt(650),
  valor?: number; // * NumberInt(150),
  tipo?: string; // * "DEP",
  imagen?: {
      url?: string,
  };
  aprobado?: boolean;
  ultimo?: boolean;
  auditoria?: {
      fecha_ingresa?: Date,
  };
  tipo_movimiento?: string;
  tipo_descripcion?: string;
}

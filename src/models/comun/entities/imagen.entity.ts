import { prop } from '@typegoose/typegoose';

import { AuditoriaEntity } from '@models/auditoria/auditoria.entity';

export class ImagenEntity {
  @prop({ default: '' })
  destination: string; // * "/home/martinezd/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/1234966841"
  @prop({ default: '' })
  encoding: string; // * "7bit"
  @prop({ default: '' })
  fieldname: string; // *  "1234966841"
  @prop({ default: '' })
  filename: string; // * "1234966841.jpeg"
  @prop({ default: '' })
  mimetype: string; // * "image/jpeg"
  @prop({ default: '' })
  originalname: string; // * "WhatsApp Image 2023-11-17 at 14.02.51.jpeg"
  @prop({ default: '' })
  path: string; // * "/home/martinezd/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/1234966841/1234966841.jpeg"
  @prop({ default: 0 })
  size: number; // * 131101
  @prop({ default: '' })
  url!: string;
  @prop({ default: '' })
  base64!: string;
  @prop({ type: AuditoriaEntity, _id: false })
  auditoria: AuditoriaEntity;
}

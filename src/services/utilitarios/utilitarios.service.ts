import { Injectable } from '@nestjs/common';

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "fs";
import * as moment from 'moment';
import * as path from "path";


// import { Globals } from '@app/libs/config/globals';
// declare const global: Globals;

@Injectable()
export class UtilitariosService {

  static FORMATOS = {
    FECHA: {
      YYYYMMDD_HHMM: 'YYYY-MM-DD HH:mm'
    },
    STRINGS: {
      BASE64: `base64` as BufferEncoding
    }
  };

  static MENSAJES = {
    FECHA: {
      FORMATO: {
        MMDD: {
          INCORRECTO: 'Formato incorrecto para fecha: -MM-DD'
        }
      }
    },
    EMAIL: {
        REGEXP: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        MENSAJE: {
            INCORRECTO: 'El e-mail es incorrecto'
        }
    }
  }

  static retornaFechaActual() {
    return moment().format(UtilitariosService.FORMATOS.FECHA.YYYYMMDD_HHMM);
  }

  static verificaFechas(fechaComparar: Date, esMayor: boolean = false) {
    // * false -> la fecha Actual > a la indicada...
    if(!esMayor) return moment().isAfter(moment(fechaComparar));
    // * true -> la fecha actual < a la indicada...
    if(esMayor) return moment().isBefore(moment(fechaComparar));
  }

  /**
   * 
   * @param archivo 
   * @returns Arreglo con el nombre y extensión del archivo
   * [0] => nombre archivo
   * [1] => extension 
   */
  static retornaNombreExtensionArchivo(archivo: string) {
    // * retorna el arreglo del nombre y extensión del archivo...
    return archivo.split(".");
  }

  static retornaRutaRaizProyecto() {
    // retornando la ruta raiz del proyecto... 
    return `${path.join(`${__dirname}`, '../', '../', '../', '../')}`;
  }

  static retornaRutaCarpetaPublica() {
    // retornando la ruta raiz del proyecto... 
    return `/public`;
  }

  static retornaArchivoBase64(pathFile: string) {
    try {
      // lee el archivo...
      return readFileSync(pathFile).toString(UtilitariosService.FORMATOS.STRINGS.BASE64);
    } catch (error) {
      throw error;
    }
  }

  static retornaBufferArchivo(pathFile: string) {
    try {
      // lee el archivo...
      return readFileSync(pathFile);
    } catch (error) {
      throw error;
    }
  }

  static verificaExisteDirectorio(ruta: string): boolean {
    return existsSync(ruta);
  }

  static creaDirectorio(ruta: string): void {
    mkdirSync(ruta);
  }

  static retornaBufferDesdeBase64(strBase64: string) {
    return Buffer.from(strBase64, UtilitariosService.FORMATOS.STRINGS.BASE64);
  }
  
  static creaArchivoDesdeBufferServidor(ruta: string, archivo: Buffer) {
    writeFileSync(ruta, archivo);
  }

  static eliminaCarpeta(ruta: string) {
    return rmSync(ruta, {
      force: true,
      recursive: true
    });
  }
}

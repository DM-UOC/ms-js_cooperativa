import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { load } from 'js-yaml';
import { UtilitariosService } from '@services/utilitarios/utilitarios.service';

// path al archivo yml...
let rootPath = join(UtilitariosService.retornaRutaRaizProyecto());

// constante captura archivo yml...
const yamlConf: any = load(
  readFileSync(`${rootPath}/libs/config/config.yml`, 'utf-8')
);

// environment...
const environment: string = process.env.NODE_ENV;

// exportando objeto...
export default () => {
  return yamlConf[environment];
}
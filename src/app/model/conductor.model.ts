import { DataCatalogo } from "./common/data-catalogo.model";

export class Conductor {
  pais: DataCatalogo = new DataCatalogo;
  tipoDocIdentidad: DataCatalogo = new DataCatalogo;
  numDocIdentidad!: string;
  nomConductor!: string;
  apeConductor!: string;
  numLicencia!: string;
}

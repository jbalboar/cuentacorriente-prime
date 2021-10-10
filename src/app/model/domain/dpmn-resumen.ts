import { DataCatalogo } from "../common/data-catalogo.model";

export class DpmnResumen {
  cod: number;
  msg: string;
  numCorredoc: number;
  numeroDeDocumentoDescarga: string;
  estado: DataCatalogo;
  paisPlaca: DataCatalogo;
  placa: string;
  placaCarreta: string;
  flujoVehiculo: DataCatalogo;
  fechaDeRegistro: Date;
  rucDelRemitente: string;
  cantidadDeSeries: number;
  cantidadDeControles: number;
  fechaDelUltimoControl: Date;
  canalDelUltimoControl: DataCatalogo;
  funcionarioAduanero: string;
  nro: string;
}
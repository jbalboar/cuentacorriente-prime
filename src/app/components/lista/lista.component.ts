import { Component, OnInit, ViewChild} from '@angular/core';

/** Constants used to fill up our data base. */
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { HttpClient, HttpParams } from '@angular/common/http';
import { DocumentodescargaService } from 'src/app/services/documentodescarga.service';
import { Documento } from 'src/app/model/documento';
import 'rxjs/add/operator/toPromise';
import { DocumentoDescarga } from 'src/app/model/domain/DocumentoDescarga';
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen';
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MessageService]
})
export class ListaComponent implements OnInit {

  respuestaData: any;
  title = 'app works!';

  loading = true;
  statuses: any[] = [];
  @ViewChild('dt')
  table!: Table;
  activityValues: number[] = [0, 100];
  value1!: string;
  resultado!: Object;

  documentos: DocumentoDescarga[] = new Array();

  public lstDpmn: any[] = new Array();


  constructor(private http: HttpClient, private myService: ConsultaDpmnService) {}

  ngOnInit(): void {
    this.myService.rptDpmnResumen$.subscribe((data) => {
      this.lstDpmn = data;
    });
    this.loading = false;
  }

  clear(table: Table) {
    table.clear();
  }
  get() {
    let numCorrelativo = 1231;
    let formdata = new FormData();
    formdata.append('email', 'adam@example.com');

    this.http.get("v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns" + "/" + numCorrelativo)
      .subscribe(data => {
        console.log(data);
      });
  }

  cargarCuentasCorrientesByDocumento() {
    this.http.post("v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar",
      {
        "indicadorPorDocumento": true,
        "aduanaDeDescarga": {
          "codDatacat": "181"
        },
        "anoDeDescarga": 2021,
        "puestoDeControlDescarga": {
          "codDatacat": "0202"
        },
        "numeroDeDescarga": 212
      })
      .subscribe((cuentas: any) => {

        this.respuestaData = cuentas;
        console.log(this.respuestaData);
      })
    this.loading = false;
  }

  cargarCuentasCorrientesByDeclaracion() {
    this.http.post("v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar",
      {
        "indicadorPorDeclaracion": true,
        "aduanaDeDeclaracion": {
          "codDatacat": "181"
        },
        "anoDeDeclaracion": 2021,
        "regimenDeDeclaracion": {
          "codDatacat": "18"
        },
        "numeroDeDeclaracion": 408076
      })
      .subscribe((cuentas: any) => {

        this.respuestaData = cuentas;
        console.log(this.respuestaData);
      })
    this.loading = false;
  }
  cargarCuentasCorrientesByFechas() {
    this.http.post("v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar",
      {
        "indicadorPorFecha": true,
        "fechaDeInicioConsulta": "01/01/2021",
        "fechaFinConsulta": "04/01/2021"
      })
      .subscribe((cuentas: any) => {

        this.respuestaData = cuentas;
        console.log('por fecha' + this.respuestaData);
      })
    this.loading = false;
  }


}



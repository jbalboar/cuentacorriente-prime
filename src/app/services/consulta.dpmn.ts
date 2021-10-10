import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda'
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen'


@Injectable({
  providedIn: 'root'
})
export class ConsultaDpmnService {
  private RESOURCE_CONSULTA_DPMN: string = "http://localhost:3001/v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar";

  private dpmn: DpmnResumen[] = new Array();
  private rptDpmnResumen = new BehaviorSubject<any>(this.dpmn);
  public rptDpmnResumen$ = this.rptDpmnResumen.asObservable();

  constructor(private http: HttpClient) { }

  buscarDpmns(consultaDpmn: ConsultaDpmn): Promise<any> {
    return this.buscarDeclaracionHttp(consultaDpmn).then((respuesta: any) => {
      this.rptDpmnResumen.next(respuesta);
    });
  };


  private buscarDeclaracionHttp(consultaDpmn: ConsultaDpmn): Promise<any> {
    return this.http.post<any>(this.RESOURCE_CONSULTA_DPMN, consultaDpmn).pipe(
      map(resp => {
        if('msg' in resp) {
          var err: DpmnResumen;
          err = resp;
          return err;
        }else{
          var resumenDpmn: DpmnResumen[] = new Array();
          resumenDpmn = resp;
          return resumenDpmn;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    ).toPromise();
  }
}


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Documento } from '../model/documento';
import { DocumentoDescarga } from '../model/domain/DocumentoDescarga';

@Injectable({
  providedIn: 'root'
})
export class DocumentodescargaService {
  localUrl= 'v1/controladuanero/prevencion/cuentacorrienteimpo/e/dpmns/listar';
  constructor(private http:HttpClient) { }

  getDocumentoDescarga(){
    console.log("entro aquiii");
    return this.http.post<DocumentoDescarga>
    (this.localUrl,
    {
      "indicadorPorFecha": true,
      "fechaDeInicioConsulta":"01/01/2021", 
      "fechaFinConsulta":"04/01/2021"
      })
      .pipe(
        map((resp:any)=>this.crearDocumento(resp))
      );
  }
  private crearDocumento(resp:any){
      const documentos: DocumentoDescarga[]=[];
      console.log('documento Service:  '+resp);
      Object.keys(resp).forEach(key=>{
        const docu:DocumentoDescarga=resp[key];
        docu.estado.codDatacat=key;
        documentos.push(docu);
       });
    console.log('DocumentoService:data de los documentos service fuera foreach',JSON.stringify(documentos));
    return documentos;
    
  }
}
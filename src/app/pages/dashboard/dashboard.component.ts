import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { PrimeNGConfig, MessageService, Message } from 'primeng/api';
import { EmpresaTrans } from 'src/app/model/bean/empresaTrans.model';
import { Ruc } from 'src/app/model/bean/ruc.model';
import { ConsultaDpmn } from 'src/app/model/bean/param-busqueda'
import { DataCatalogo } from 'src/app/model/common/data-catalogo.model'
import { ConsultaDpmnService } from 'src/app/services/consulta.dpmn'
import {ListaComponent} from 'src/app/components/lista/lista.component' 
import { DpmnResumen } from 'src/app/model/domain/dpmn-resumen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, ListaComponent]
})
export class DashboardComponent implements OnInit {

  private RESOURCE_RUC: string = "http://localhost:3001/v1/controladuanero/prevencion/cuentacorrienteimpo/e/ruc/";
  private RESOURCE_PUESTO_CONTROL: string = "http://localhost:3001/v1/controladuanero/prevencion/cuentacorrienteimpo/e/puestoscontrol/";
  private RESOURCE_EMPRESA_TRANS: string = "http://localhost:3001/v1/controladuanero/prevencion/cuentacorrienteimpo/e/empresasdetranspinter/";

  loadingConsultar = false;
  consultaForm: FormGroup;
  lstTipoDocumento: any;
  lstTipoControl: any;
  lstPaisVehiculo: any;
  lstAduanaDocumento: any;
  lstPuestoControl: any;
  lstRegimen: any;
  date = new Date();
  maxLengthNumDoc: number = 11;
  esVisible: boolean = true;
  msgs: Message[] = [];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private consultaDpmnService: ConsultaDpmnService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCatalogo('assets/json/tipoDocumento.json', 1);
    this.getCatalogo('assets/json/tipoControl.json', 2);
    this.getCatalogo('assets/json/paisPlaca.json', 3);
    this.getCatalogo('assets/json/aduanas.json', 4);
    this.getCatalogo('assets/json/regimen.json', 5);

    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]
    });
  }

  private buildForm() {
    this.consultaForm = this.formBuilder.group({
      codEmprTrans: [''],
      tipoDocumento: ['1', [Validators.required]],
      tipoControl: ['T'],
      codPaisPlaca: [''],
      numPlaca: [''],
      numeroRucEmprTrans: [''],
      tipoBusqueda: ['', [Validators.required]],
      codAduanaDocumento: [{ value: '', disabled: true }],
      codPuestoControl: [{ value: '', disabled: true }],
      anoDocumento: [{ value: this.date.getFullYear(), disabled: true }],
      numeroDocumento: [{ value: '', disabled: true }],
      numeroRucRemitente: [''],
      codAduanaDAM: [{ value: '', disabled: true }],
      anoDAM: [{ value: this.date.getFullYear(), disabled: true }],
      codRegimen: [{ value: '10', disabled: true }],
      numeroDAM: [{ value: '', disabled: true }],
      fechaInicio: new FormControl({ value: new Date(this.date.getFullYear(), this.date.getMonth(), 1), disabled: true }),
      fechaFin: new FormControl({ value: this.date, disabled: true }),
      descRazonSocialEmprTrans: new FormControl(),
      descRazonSocialRemitente: new FormControl()
    });
  }

  async consultar() {
    this.loadingConsultar = true;
    var tipo = this.consultaForm.controls.tipoBusqueda.value;

    if (this.consultaForm.invalid) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar al menos un criterio de búsqueda' });
      this.loadingConsultar = false;
      return;
    }

    if (tipo == 1) {
      if (!this.cumpleValidacionPorNumeroDocumento()){
        this.loadingConsultar = false;
        return;
      }
    } else if (tipo == 2) {
      if (!this.cumpleValidacionPorDAM()){
        this.loadingConsultar = false;
        return;
      }
    } else {
      if (!this.cumpleValidacionPorFecha()){
        this.loadingConsultar = false;
        return;
      }
    }

    if(this.consultaForm.controls.tipoDocumento.value == 1){
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'La consulta por CCMN no se encuentra' });
      this.loadingConsultar = false;
      return;
    }

    let paramConsulta = new ConsultaDpmn();
    paramConsulta.codigoTransportista = this.consultaForm.controls.codEmprTrans.value;
    paramConsulta.rucTransportista = this.consultaForm.controls.numeroRucEmprTrans.value;
    paramConsulta.razonSocialTransportista = this.consultaForm.controls.descRazonSocialEmprTrans.value;
    paramConsulta.tipoDocumentoDescarga = this.generaDataCatalogo(this.consultaForm.controls.tipoDocumento.value);
    paramConsulta.tipoDeControl = this.generaDataCatalogo(this.consultaForm.controls.tipoControl.value)
    paramConsulta.paisPlacaDelVehiculo = this.generaDataCatalogo(this.consultaForm.controls.codPaisPlaca.value);
    //paramConsulta.placaDelVehiculo =
    paramConsulta.indicadorPorDocumento = this.consultaForm.controls.tipoBusqueda.value=='1'?true:false;
    paramConsulta.numeroDeDescarga = this.consultaForm.controls.numeroDocumento.value;
    paramConsulta.aduanaDeDescarga = this.generaDataCatalogo(this.consultaForm.controls.codAduanaDocumento.value);
    paramConsulta.puestoDeControlDescarga = this.generaDataCatalogo(this.consultaForm.controls.codPuestoControl.value);
    paramConsulta.anoDeDescarga = this.consultaForm.controls.anoDocumento.value;
    paramConsulta.rucDelRemitente = this.consultaForm.controls.numeroRucRemitente.value;
    paramConsulta.razonSocialDelRemitente = this.consultaForm.controls.descRazonSocialRemitente.value;
    paramConsulta.indicadorPorDeclaracion = this.consultaForm.controls.tipoBusqueda.value=='2'?true:false;
    paramConsulta.aduanaDeDeclaracion = this.generaDataCatalogo(this.consultaForm.controls.codAduanaDAM.value);
    paramConsulta.anoDeDeclaracion = this.consultaForm.controls.anoDAM.value;
    paramConsulta.regimenDeDeclaracion = this.generaDataCatalogo(this.consultaForm.controls.codRegimen.value);
    paramConsulta.numeroDeDeclaracion = this.consultaForm.controls.numeroDAM.value;
    paramConsulta.indicadorPorFecha = this.consultaForm.controls.tipoBusqueda.value=='3'?true:false;
    paramConsulta.fechaDeInicioConsulta = this.consultaForm.controls.fechaInicio.value;
    paramConsulta.fechaFinConsulta = this.consultaForm.controls.fechaFin.value;

    /*Se consume el servicio REST de validacion y busqueda de DPMN*/
    await this.consultaDpmnService.buscarDpmns(paramConsulta);

    this.messageService.clear;

    this.consultaDpmnService.rptDpmnResumen$.subscribe((resultado : DpmnResumen[]) => {
      var cumpleValidacion = false;
      resultado.forEach(dpmn=>{
        if(dpmn.msg!=null || dpmn.msg!=undefined){
          cumpleValidacion = false;
          this.messageService.add({ key: 'msj', severity: 'warn', detail: dpmn.msg });
          this.loadingConsultar = false;
          return;
        }else{
          cumpleValidacion = true;
        }
      })

      if(cumpleValidacion){
        this.router.navigate(['/dashboard/lista'])
      }
    });

    this.loadingConsultar = false;
  }

  generaDataCatalogo(valor: string): any {
    let datacatalogo = new DataCatalogo();
    datacatalogo.codDatacat = valor;
    return datacatalogo;
  }

  cumpleValidacionPorNumeroDocumento(): any {
    var aduana = this.consultaForm.controls.codAduanaDocumento.value;
    var tipoDocumento = this.consultaForm.controls.tipoDocumento.value;
    var puestoControl = this.consultaForm.controls.codPuestoControl.value;
    var anio = this.consultaForm.controls.anoDocumento.value;
    var numero = this.consultaForm.controls.numeroDocumento.value;

    if (aduana == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar la Aduana del Documento' });
      return false;
    }

    if (tipoDocumento == '1' && puestoControl == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar el Puesto de Control' });
      return false;
    }

    if (anio == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar el Año del Documento' });
      return false;
    }

    if (numero == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar el Número del Documento' });
      return false;
    }

    return true;
  }

  cumpleValidacionPorDAM(): any {
    var aduana = this.consultaForm.controls.codAduanaDAM.value;
    var anio = this.consultaForm.controls.anoDAM.value;
    var regimen = this.consultaForm.controls.codRegimen.value;
    var numero = this.consultaForm.controls.numeroDAM.value;

    if (aduana == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar la Aduana de la Declaración' });
      return false;
    }

    if (anio == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar el Año de la Declaración' });
      return false;
    }

    if (regimen == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe seleccionar el Régimen de la Declaración' });
      return false;
    }

    if (numero == '') {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar el Número de la Declaración' });
      return false;
    }

    return true;
  }

  cumpleValidacionPorFecha(): any {
    var fechaInicio = this.consultaForm.controls.fechaInicio.value;
    var fechaFin = this.consultaForm.controls.fechaFin.value;

    if (fechaInicio == null) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar la fecha de inicio' });
      return false;
    }

    if (fechaFin == null) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Debe ingresar la fecha de fin' });
      return false;
    }


    if (fechaInicio > fechaFin) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'La fecha de inicio no puede ser mayor a la fecha fin' });
      return false;
    }

    return true;
  }
  onRadioChange() {
    var tipo = this.consultaForm.controls.tipoBusqueda.value;
    if (tipo == 1) {
      this.enabledDocumento();
    } else if (tipo == 2) {
      this.enabledDAM();
    } else if (tipo == 3) {
      this.enabledFechas();
    }
  }

  onChangeTipoDoc() {
    var tipo = this.consultaForm.controls.tipoDocumento.value;
    if (tipo == 1) {
      this.maxLengthNumDoc = 11;
      this.esVisible = true;
      this.consultaForm.controls.numeroDocumento.setValue('');
    } else {
      this.maxLengthNumDoc = 6;
      this.esVisible = false;
      this.consultaForm.controls.numeroDocumento.setValue('');
    }
  }

  validarPlaca() {
    var placa = this.consultaForm.controls.numPlaca.value;
    var regexp = new RegExp('^[A-Z0-9]{5,7}$');
    if (placa.length == 0)
      return;

    if (!regexp.test(placa)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Ingrese correctamente el número de placa' });
      this.consultaForm.controls.numPlaca.setValue('');
    }
  }

  /*Carga los puesto de control por aduana seleccionada*/
  cargarPuestoControl() {
    this.http
      .get<any>(this.RESOURCE_PUESTO_CONTROL + this.consultaForm.controls.codAduanaDocumento.value).subscribe((res: any) => {
        this.lstPuestoControl = res;
      }, error => {
        console.log({ error });
      })
  }

  /*Obtiene los valores a cargar en los dropdown*/
  getCatalogo(url: string, tipo: number) {
    return this.http
      .get<any>(url).subscribe((data) => {
        if (tipo == 1) {
          this.lstTipoDocumento = data;
        } else if (tipo == 2) {
          this.lstTipoControl = data;
        } else if (tipo == 3) {
          this.lstPaisVehiculo = data;
        } else if (tipo == 4) {
          this.lstAduanaDocumento = data;
        } else if (tipo == 5) {
          this.lstRegimen = data;
        }
      }, error => {
        console.log({ error });
      })
  }

  /*Obtiene el nombre por Codigo de Empresa*/
  buscarEmprTrans() {
    var regexp = new RegExp('^[0-9]{4,6}$');
    var codEmpresa = this.consultaForm.controls.codEmprTrans.value;

    if (codEmpresa.length == 0)
      return;

    if (!regexp.test(codEmpresa)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'Ingrese correctamente el código de empresa' });
      this.consultaForm.controls.codEmprTrans.setValue('');
      return;
    }

    this.http
      .get<EmpresaTrans>(this.RESOURCE_EMPRESA_TRANS + codEmpresa).subscribe((res: EmpresaTrans) => {
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue(res.dnombre);
      }, error => {
        console.log({ error });
        this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El código de empresa no existe' });
        this.consultaForm.controls.codEmprTrans.setValue('');
        this.consultaForm.controls.descRazonSocialEmprTrans.setValue('');
      })
  }

  /*Obtiene la razon social por RUC*/
  buscarRUC(tipo: string) {
    var ruc = '';
    if (tipo == '1') {
      ruc = this.consultaForm.controls.numeroRucEmprTrans.value;
    } else {
      ruc = this.consultaForm.controls.numeroRucRemitente.value;
    }

    var regexp = new RegExp('^[0-9]{11}$');

    if (ruc.length == 0)
      return;

    if (!regexp.test(ruc)) {
      this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El número de RUC debe tener 11 dígitos' });
      if (tipo == '1') {
        this.consultaForm.controls.numeroRucEmprTrans.setValue('');
      } else {
        this.consultaForm.controls.numeroRucRemitente.setValue('');
      }
      return;
    }

    this.http
      .get<Ruc>(this.RESOURCE_RUC + ruc).subscribe((res: Ruc) => {
        if (tipo == '1') {
          this.consultaForm.controls.descRazonSocialEmprTrans.setValue(res.razonSocial);
        } else {
          this.consultaForm.controls.descRazonSocialRemitente.setValue(res.razonSocial);
        }
      }, error => {
        console.log({ error });
        this.messageService.add({ key: 'msj', severity: 'warn', detail: 'El número de RUC no existe' });
        if (tipo == '1') {
          this.consultaForm.controls.numeroRucEmprTrans.setValue('');
          this.consultaForm.controls.descRazonSocialEmprTrans.setValue('');
        } else {
          this.consultaForm.controls.numeroRucRemitente.setValue('');
          this.consultaForm.controls.descRazonSocialRemitente.setValue('');

        }
      })
  }

  enabledDocumento() {
    this.consultaForm.controls.codAduanaDocumento.enable();
    this.consultaForm.controls.codPuestoControl.enable();
    this.consultaForm.controls.anoDocumento.enable();
    this.consultaForm.controls.numeroDocumento.enable();
    this.consultaForm.controls.codAduanaDAM.disable();
    this.consultaForm.controls.anoDAM.disable();
    this.consultaForm.controls.codRegimen.disable();
    this.consultaForm.controls.numeroDAM.disable();
    this.consultaForm.controls.fechaInicio.disable();
    this.consultaForm.controls.fechaFin.disable();
  }

  enabledDAM() {
    this.consultaForm.controls.codAduanaDAM.enable();
    this.consultaForm.controls.anoDAM.enable();
    this.consultaForm.controls.codRegimen.enable();
    this.consultaForm.controls.numeroDAM.enable();
    this.consultaForm.controls.fechaInicio.disable();
    this.consultaForm.controls.fechaFin.disable();
    this.consultaForm.controls.codAduanaDocumento.disable();
    this.consultaForm.controls.codPuestoControl.disable();
    this.consultaForm.controls.anoDocumento.disable();
    this.consultaForm.controls.numeroDocumento.disable();
  }

  enabledFechas() {
    this.consultaForm.controls.fechaInicio.enable();
    this.consultaForm.controls.fechaFin.enable();
    this.consultaForm.controls.codAduanaDAM.disable();
    this.consultaForm.controls.anoDAM.disable();
    this.consultaForm.controls.codRegimen.disable();
    this.consultaForm.controls.numeroDAM.disable();
    this.consultaForm.controls.codAduanaDocumento.disable();
    this.consultaForm.controls.codPuestoControl.disable();
    this.consultaForm.controls.anoDocumento.disable();
    this.consultaForm.controls.numeroDocumento.disable();
  }





}

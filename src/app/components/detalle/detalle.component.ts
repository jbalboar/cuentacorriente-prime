import { Component,Input,Output,ViewChild, EventEmitter,OnInit } from '@angular/core';

import { CustomerService } from './../../services/customer.services';
import { Customer,Representative } from "../../model/customer";
import { FormGroup } from '@angular/forms';
import { CuentacorrienteService } from 'src/app/services/cuentacorriente.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
 /** Constants used to fill up our data base. */
 const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls:['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  //datos de TRansporte
  //datos de TRansporte

  datosTransporteForm!: FormGroup;
  loading: boolean = true;
  customers: Customer[] = [];
  sortBy:any;
  constructor(private customerService: CustomerService,
    private cuentacorrienteService:CuentacorrienteService){
    // Create 100 users
    const users = Array.from({length: 10}, (_, k) => createNewUser(k + 1));
     
    this.customerService.getListadeDocumentosParams()
    .subscribe(resp=> {
      console.log(resp);  
    },(err)=>{
      console.log('Error en el componente');
    }
    );
  }

  ngOnInit() {


    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;
    });

   this.customers.forEach(customer => customer.date = new Date(customer.date.toString()));
   this.getListadeDocumentos().then(usuarios=>{
     console.log(usuarios);


   }) ;

  }
  ngAfterViewInit() {
    console.log(' aaa' );


  }
  @Input() codigo: number=1;

  @Output() valorSalida:EventEmitter<number>=new EventEmitter();

  numeroRuc: number=50;
  razonSocial: string="chucuito";
  tipoDocumento:number=1;
  tipoControl:number=2



   get getRuc(){
    return `${this.numeroRuc}%`;
    this.valorSalida.emit(100);
  }
  get getRazonSocial(){
    return `${this.razonSocial}%`;
    this.valorSalida.emit(10);
  }

  getListadeDocumentos(){
    return  new Promise (resolve=>{

      fetch('https://reqres.in/api/users')
      .then(resp=>resp.json())
      .then(body=>resolve(body.data));
    });

  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

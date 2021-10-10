import { PersonaComponent } from './../components/persona/persona.component';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { DetalleComponent } from './../components/detalle/detalle.component';
import { ListaComponent } from './../components/lista/lista.component';
import { ReporteComponent } from './../components/reporte/reporte.component';
const routes:Routes=[
    {path:'dashboard',
        component:PagesComponent,
        children:[
          { path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
          { path:'progress',component:ProgressComponent,data:{titulo:'ProgressBar'}},
          { path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica #1'}},
          { path:'lista/detalles',component:DetalleComponent,data:{titulo:'Detalle #1'}},
          { path:'lista',component:ListaComponent,data:{titulo:'Consulta de DPMN-Titulo'}},
          { path:'reporte',component:ReporteComponent,data:{titulo:'Reporte '}},
          { path:'rxjs', component:RxjsComponent,data:{titulo:'Rxjs'}},
          { path:'persona', component:PersonaComponent,data:{titulo:'Persona'}},
          { path:'', redirectTo:'/dashboard',pathMatch:'full'},

      ]
    },
];
@NgModule({

    imports: [ RouterModule.forChild(routes) ],
    exports: []
})
export class PagesRoutingModule{}


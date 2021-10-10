import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages/pages.routing';


import {RouterModule, Routes} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';

const routes: Routes=[
//path: 'dashboard' PagesRouting
//path: 'auth' PagesRouting

{path:'',redirectTo:'/dashboard',pathMatch:'full'},

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    ButtonModule,
    PasswordModule,


  ],
  exports:[RouterModule,
    ButtonModule,
    PasswordModule,
    TableModule,
    HttpClientModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    AccordionModule,
    DropdownModule
    ]
})
export class AppRoutingModule { }

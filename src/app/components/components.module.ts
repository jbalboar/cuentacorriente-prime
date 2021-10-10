
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte/reporte.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ListaComponent } from './lista/lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



import { TableModule } from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { FieldsetModule, } from 'primeng/fieldset';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SplitterModule} from 'primeng/splitter';
import {DividerModule} from 'primeng/divider';



import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {PersonaComponent } from './persona/persona.component';
import {PanelMenuModule} from 'primeng/panelmenu';


@NgModule({
  declarations: [
    ReporteComponent,
    DetalleComponent,
    ListaComponent,
    PersonaComponent,

  ],
  exports:[
    ReporteComponent,
    DetalleComponent,
    ListaComponent,
    PersonaComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    FieldsetModule,
    KeyFilterModule,
    HttpClientModule,
    
    AutoCompleteModule,
    ButtonModule,
    PasswordModule,
    TableModule,
    AccordionModule,
    BrowserModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    SplitterModule,
    DividerModule

  ],
  bootstrap:[ComponentsModule],

})
export class ComponentsModule { }

import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {DashboardComponent} from '../pages/dashboard/dashboard.component'

@Injectable()
export class CargarCombos {

    constructor(private http: HttpClient) { }
    returnedData: any;
    /*Obtiene los tipo de Control*/
    getTipoDocumento(url: string) {

        console.log(url);
        

        return this.http
            .get<any>(url).subscribe((data) => {
                console.log(data);
                this.returnedData = data;
            }, error => {
                console.log({ error });
            })
    }
}
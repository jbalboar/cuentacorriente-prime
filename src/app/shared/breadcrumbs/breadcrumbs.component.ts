import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  ngOnDestroy(): void {
 
  }
  constructor(private router:Router, private route:ActivatedRoute ) {   
    //console.log(route.snapshot.children[0].data
    
  }
getDataruta(){

  
}
}
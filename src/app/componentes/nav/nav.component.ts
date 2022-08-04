import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isCollapse = false;   // estado del menu
  toggleState(): void { // manejador del evento menu
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }
  
 


  




}

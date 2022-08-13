import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  misProyectos:any;
  constructor(private datosPortfolio:PortfolioService, private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.misProyectos=data.projects;
    })
  }

  public loG (){
    
    return this.appComponent.loggedIn;
  }

}

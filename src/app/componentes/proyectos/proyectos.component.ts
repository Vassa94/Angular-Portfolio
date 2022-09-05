import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  images; 
  responsiveOptions;
  misProyectos: any;
  constructor(
    private datosPortfolio: PortfolioService,
    private appComponent: AppComponent
  ){
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }];
  }

  ngOnInit(): void {
    this.datosPortfolio.getProyec().subscribe((data) => {
      this.misProyectos = data;
    });
    
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  agregarBloque(){

    
  }

  

  
}

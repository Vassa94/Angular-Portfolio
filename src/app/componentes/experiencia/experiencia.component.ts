import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miExperiencia:any;
  constructor(private datosPortfolio:PortfolioService, private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.datosPortfolio.getExp().subscribe(data =>{
      this.miExperiencia=data;
    });
  }

  

  drop(event: CdkDragDrop<string[]>) {
    if (this.loG()){
      moveItemInArray(this.miExperiencia, event.previousIndex, event.currentIndex);
      console.log(this.loG());
    }
  }

  public loG (){
    
    return this.appComponent.loggedIn;
  }
}



import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';
import { modalConfigDefaults } from 'angular-bootstrap-md/lib/free/modals/modal.options';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit, OnDestroy {
  miEducacion: any;
  suscription: Subscription;
  constructor(
    private datosPortfolio: PortfolioService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.getEducacion();

    this.datosPortfolio.refresh$.subscribe(result =>{
      this.getEducacion();
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('obserbable cerrado');
  }

  getEducacion(): void {
    this.datosPortfolio.getEduc().subscribe((data) => {
      this.miEducacion = data;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.miEducacion, event.previousIndex, event.currentIndex);
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  deleteBlock(id) {
    this.datosPortfolio.deleteEduc(id).subscribe((data) => {});
  }


    
  crearBloque(educ) {}
}

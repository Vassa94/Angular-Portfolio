import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';
import { modalConfigDefaults } from 'angular-bootstrap-md/lib/free/modals/modal.options';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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

  eduform = new FormGroup({
    nombre: new FormControl(''),
    fechaInicioM: new FormControl(),
    fechaInicioA: new FormControl(),
    actual: new FormControl(),
    fechaFinM: new FormControl(),
    fechaFinA: new FormControl(),
    titulo: new FormControl (),
    descripcion: new FormControl(''),
  });

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

  agregarBloque (){
    
    const body = {
      titulo: this.eduform.value.titulo,
      actual: this.eduform.value.actual,
      fechaInicio: this.eduform.value.fechaInicioM + " " + this.eduform.value.fechaInicioA,
      fechaFin: this.eduform.value.fechaFinM + " " + this.eduform.value.fechaFinA ,
      descripcion: this.eduform.value.descripcion,
    }
    this.datosPortfolio.postExp(body).subscribe((data) => {});
    console.log(body);
  }
  
  borrarBloque(id) {
    this.datosPortfolio.deleteEduc(id).subscribe((data) => {});
  }

}

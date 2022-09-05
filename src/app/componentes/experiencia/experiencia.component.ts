import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';
import {  ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  miExperiencia: any;
  closeResult: any;
  
  checked = false;
  
  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent

  ) {}

  ngOnInit(): void {
    this.getExp();
  }

  getExp(){
    this.datosPortfolio.getExp().subscribe((data) => {
      this.miExperiencia = data;
    });
  }

  expform = new FormGroup({
    titulo: new FormControl(''),
    fechaInicioM: new FormControl(),
    fechaInicioA: new FormControl(),
    actual: new FormControl(),
    fechaFinM: new FormControl(),
    fechaFinA: new FormControl(),
    posicion: new FormControl (),
    descripcion: new FormControl(''),
  });

  /**
   * Si el usuario ha iniciado sesión, permite mover el elemento en la matriz
   * @param event - CdkDragDrop<cadena[]>
   */
  drop(event: CdkDragDrop<string[]>) {
    if (this.loG()) {
      moveItemInArray(
        this.miExperiencia,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Devuelve el valor de la propiedad logIn de appComponent
   * @returns La propiedad login de appComponent.
   */
  public loG() {
    return this.appComponent.loggedIn;
  }

  
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true ,size: 'lg' });
  }

  edit (content){
    //this.expform.setValue({});
    this.openVerticallyCentered(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  agregarBloque (){
    
    const body = {
      titulo: this.expform.value.titulo,
      actual: this.expform.value.actual,
      fechaInicio: this.expform.value.fechaInicioM + " " + this.expform.value.fechaInicioA,
      fechaFin: this.expform.value.fechaFinM + " " + this.expform.value.fechaFinA ,
      descripcion: this.expform.value.descripcion,
    }
    this.datosPortfolio.postExp(body).subscribe((data) => {});
    console.log(body);
  }
  
  borrarBloque(id) {
    this.datosPortfolio.deleteExp(id).subscribe((data) => {});
  }

  

}



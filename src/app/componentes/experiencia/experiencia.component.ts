import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';
import {  ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  miExperiencia: any;
  closeResult: any;

  expId: number;

  

  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) {}

  
  
  ngOnInit(): void {
    this.getExp();
  }

  getExp() {
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
    posicion: new FormControl(),
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
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  add(content) {
    this.expform.setValue({
      titulo: '',
      fechaInicioM: 'Mes',
      fechaInicioA: 'Año',
      actual: false,
      fechaFinM: 'Mes',
      fechaFinA: 'Año',
      posicion: '',
      descripcion: '',
    });
    this.openVerticallyCentered(content);
  }

  edit(content2,exp) {
   let fin:any
    console.log(exp);
    
    let ini = exp.fechaInicio.split(' ');
    if (exp.fechaFin=="Actualmente"){
      fin = ["Mes","Año"];
    }else{
      fin = exp.fechaFin.split(' ');
    }
    console.log(fin);
    
    this.expform.setValue({
      titulo: exp.titulo,
      fechaInicioM: ini[0],
      fechaInicioA: ini[1],
      actual: exp.actual,
      fechaFinM: fin[0],
      fechaFinA: fin[1],
      posicion: exp.posicion,
      descripcion: exp.descripcion,
    });
    this.expId=exp.id;
    this.openVerticallyCentered(content2);
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

  agregarBloque() {
    const body = {
      titulo: this.expform.value.titulo,
      actual: this.expform.value.actual,
      fechaInicio:
        this.expform.value.fechaInicioM + ' ' + this.expform.value.fechaInicioA,
      fechaFin:
        this.expform.value.fechaFinM + ' ' + this.expform.value.fechaFinA,
      descripcion: this.expform.value.descripcion,
    };
    if (this.expform.value.actual == true) {
      body.fechaFin = 'Actualmente';
    }
    this.datosPortfolio.postExp(body).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Datos agregados',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }

  borrarBloque(id) {
    this.datosPortfolio.deleteExp(id).subscribe((data) => {});
  }

  actualizarBloque(){
    console.log(this.expId);
    let ini= this.expform.value.fechaInicioM + ' ' + this.expform.value.fechaInicioA;
    let fin= this.expform.value.fechaFinM + ' ' + this.expform.value.fechaFinA;
    console.log(ini);
    console.log(fin);
    const params = new HttpParams()
      .set('titulo', this.expform.value.titulo)
      .set('fechaInicio', ini)
      .set('fechaFin', fin)
      .set('actual',this.expform.value.actual)
      .set('posicion', this.expform.value.posicion)
      .set('descripcion', this.expform.value.descripcion)
      .set('perId',1)
    
      console.log(params);
    
    
    this.datosPortfolio.putExp(this.expId,params).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Informacion editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }

}



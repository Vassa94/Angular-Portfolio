import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit, OnDestroy {
  miEducacion: any;
  suscription: Subscription;
  closeResult: any;
  eduId: number;

  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) {}

  eduform = new FormGroup({
    nombre: new FormControl(''),
    fechaInicioM: new FormControl(),
    fechaInicioA: new FormControl(),
    actual: new FormControl(),
    fechaFinM: new FormControl(),
    fechaFinA: new FormControl(),
    titulo: new FormControl(),
    descripcion: new FormControl(''),
    edit: new FormControl(),
  });

  ngOnInit(): void {
    this.getEducacion();

    this.datosPortfolio.refresh$.subscribe((result) => {
      this.getEducacion();
    });
  }

  getEducacion(): void {
    this.datosPortfolio.getEduc().subscribe((data) => {
      this.miEducacion = data;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('obserbable cerrado');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.miEducacion, event.previousIndex, event.currentIndex);
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  add(content) {
    this.eduform.setValue({
      nombre: '',
      titulo: '',
      fechaInicioM: 'Mes',
      fechaInicioA: 'Año',
      actual: false,
      fechaFinM: 'Mes',
      fechaFinA: 'Año',
      descripcion: '',
      edit: 0,
    });
    this.openVerticallyCentered(content);
  }

  edit(content2, educ) {
    let fin: any;
    console.log(educ);

    let ini = educ.fechaInicio.split(' ');
    if (educ.fechaFin == 'Actualmente') {
      fin = ['Mes', 'Año'];
    } else {
      fin = educ.fechaFin.split(' ');
    }
    console.log(fin);

    this.eduform.setValue({
      nombre: educ.nombre,
      titulo: educ.titulo,
      fechaInicioM: ini[0],
      fechaInicioA: ini[1],
      actual: educ.actual,
      fechaFinM: fin[0],
      fechaFinA: fin[1],
      descripcion: educ.descripcion,
      edit: 1,
    });
    this.eduId = educ.id;
    this.openVerticallyCentered(content2);
  }

  form() {
    if (this.eduform.value.edit == 0) {
      this.agregarBloque();
    } else {
      this.actualizarBloque();
    }
  }

  agregarBloque() {
    const body = {
      nombre: this.eduform.value.nombre,
      titulo: this.eduform.value.titulo,
      actual: this.eduform.value.actual,
      fechaInicio:
        this.eduform.value.fechaInicioM + ' ' + this.eduform.value.fechaInicioA,
      fechaFin:
        this.eduform.value.fechaFinM + ' ' + this.eduform.value.fechaFinA,
      descripcion: this.eduform.value.descripcion,
    };
    if (this.eduform.value.actual == true) {
      body.fechaFin = 'Actualmente';
    }
    this.datosPortfolio.postEduc(body).subscribe((data) => {});

    Swal.fire({
      title: '¡Genial!',
      text: 'Información agregada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    
    this.miEducacion.push(body);
  }

  borrarBloque(id) {
    this.datosPortfolio.deleteEduc(id).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Información borrada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    this.getEducacion();
  }

  actualizarBloque() {
    let ini =
      this.eduform.value.fechaInicioM + ' ' + this.eduform.value.fechaInicioA;
    let fin = this.eduform.value.fechaFinM + ' ' + this.eduform.value.fechaFinA;
    const params = new HttpParams()
      .set('titulo', this.eduform.value.titulo)
      .set('fechaInicio', ini)
      .set('fechaFin', fin)
      .set('actual', this.eduform.value.actual)
      .set('nombre', this.eduform.value.nombre)
      .set('descripcion', this.eduform.value.descripcion)
      .set('perId', 1);

    this.datosPortfolio.putEduc(this.eduId, params).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Información editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    this.getEducacion();
  }
}

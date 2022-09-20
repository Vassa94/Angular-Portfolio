import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {  ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  images; 
  responsiveOptions;
  misProyectos: any;
  closeResult: any;
  proyId:number;

  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
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

  proyform = new FormGroup({
    nombre: new FormControl(''),
    imgUrl: new FormControl(),
    descripcion: new FormControl(),
    linkUrl: new FormControl()    
  });


  ngOnInit(): void {
    this.getProyect();
    
  }

  getProyect ():void{
    this.datosPortfolio.getProyec().subscribe((data) => {
      this.misProyectos = data;
    });
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  add(content) {
    this.proyform.setValue({
      nombre:'',
      imgUrl:'',
      descripcion: '',
      linkUrl: ''
    });
    this.openVerticallyCentered(content);
  }

  edit(content2,proyect){
    console.log(proyect);
    this.proyform.setValue({
      nombre: proyect.nombre,
      imgUrl: proyect.imgUrl,
      descripcion: proyect.descripcion,
      linkUrl: proyect.linkUrl
    });
    this.proyId=proyect.id;
    this.openVerticallyCentered(content2);
  }

  agregarBloque (){
    
    const body = {
      nombre:this.proyform.value.nombre,
      imgUrl:this.proyform.value.imgUrl,
      descripcion: this.proyform.value.descripcion,
      linkUrl: this.proyform.value.linkUrl
    }
    this.datosPortfolio.postProyect(body).subscribe((data) => {});
    
    Swal.fire({
      title: '¡Genial!',
      text: 'Información agregada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.getProyect();
    this.misProyectos.next();
  }
  
  borrarBloque(id) {
    this.datosPortfolio.deleteProyect(id).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Información borrada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.getProyect();

  }

  actualizarBloque(){
    const params = new HttpParams()
      .set('nombre', this.proyform.value.nombre)
      .set('imgUrl', this.proyform.value.imgUrl)
      .set('descripcion', this.proyform.value.descripcion)
      .set('linkUrl', this.proyform.value.linkUrl)
      .set('perId',1)
    
    //this.datosPortfolio.putProyect(this.proyId,params).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Información editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.getProyect();
  }

  

  
}

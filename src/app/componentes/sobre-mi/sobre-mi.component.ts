import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import {  ModalDismissReasons,NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css'],
})
export class SobreMiComponent implements OnInit,OnDestroy {
  miInfo: any;
  closeResult: any;
  suscription: Subscription;
  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.getHeader();
    
    

    this.datosPortfolio.refresh$.subscribe(result =>{
      this.getHeader();
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('obserbable cerrado');
  }

  getHeader(){
    this.datosPortfolio.getHeader().subscribe((data) => {
      this.miInfo = data;
    });
    console.log(this.loG());
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

  
  personaform = new FormGroup({
    descripcion: new FormControl(''),
    imgUrl: new FormControl(''),
  });



  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true ,size: 'lg' });
  }

  edit (content){
    this.personaform.setValue({descripcion:this.miInfo.about,imgUrl:this.miInfo.imgUrl});
      
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

  public loG() {
    return this.appComponent.loggedIn;
  }

  private saveData() {
    const params = new HttpParams()
      .set('nombre', this.miInfo.nombre)
      .set('apellido', this.miInfo.apellido)
      .set('titulo', this.miInfo.titulo)
      .set('imgUrl', this.personaform.value.imgUrl)
      .set('about', this.personaform.value.descripcion);

    this.datosPortfolio.putHeader(params).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Informacion editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

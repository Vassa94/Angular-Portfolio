import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit, OnDestroy {
  responsiveOptions;
  misProyectos: any;
  closeResult: any;
  proyId:number;
  suscription: Subscription;
  files: any[] = [];


  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ){ }

  proyform = new FormGroup({
    nombre: new FormControl(''),
    imgUrl: new FormControl(),
    descripcion: new FormControl(),
    linkUrl: new FormControl(),
    edit: new FormControl()   
  });


  ngOnInit(): void {
    this.getProyect();

    this.datosPortfolio.refresh$.subscribe(result =>{
      this.getProyect();
    })
    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('obserbable cerrado');
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
      linkUrl: '',
      edit: 0
    });
    this.openVerticallyCentered(content);
  }

  edit(content2,proyect){
    console.log(proyect);
    this.proyform.setValue({
      nombre: proyect.nombre,
      imgUrl: proyect.imgUrl,
      descripcion: proyect.descripcion,
      linkUrl: proyect.linkUrl,
      edit:1
    });
    this.proyId=proyect.id;
    this.openVerticallyCentered(content2);
  }

  form() {
    if (this.proyform.value.edit == 0) {
      this.agregarBloque();
    } else {
      this.actualizarBloque();
    }
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
  }
  
  borrarBloque(id) {
    Swal.fire({
      title: '¿Seguro quiere borrar este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortfolio.deleteProyect(id).subscribe((data) => {});
        Swal.fire({
          title: '¡Genial!',
          text: 'Información borrada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } 
    })
    
    this.getProyect();
  }

  actualizarBloque(){
    const params = new HttpParams()
      .set('nombre', this.proyform.value.nombre)
      .set('imgUrl', this.proyform.value.imgUrl)
      .set('descripcion', this.proyform.value.descripcion)
      .set('linkUrl', this.proyform.value.linkUrl)
      .set('perId',1)
    this.datosPortfolio.putProyect(this.proyId,params).subscribe((data) => {});
    Swal.fire({
      title: '¡Genial!',
      text: 'Información editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.getProyect();
  }

  
   //on file drop handler
   
   onFileDropped($event) {
    this.prepareFilesList($event);
  }

  //handle file from browsing
   
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  
}

import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  miPortfolio: any;
  closeResult: any;

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

  getHeader(){
    this.datosPortfolio.getHeader().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
  
   //Devuelve el estado del Login
   
  public loG() {
    return this.appComponent.loggedIn;
  }

  //Creación de un nuevo grupo de formularios con tres controles de formulario.
  personaform = new FormGroup({
    nombre: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    apellido: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    titulo: new FormControl(),
  });

  /**
   * La función open() toma un componente modal como primer argumento y un objeto de opciones
   * opcionales como segundo argumento.
   * @param content - El contenido del modal. Puede ser una variable de referencia de plantilla, un
   * componente o una cadena simple.
   */

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
    this.modalService.open(content, { centered: true });
  }

  edit (content){
    this.personaform.setValue({nombre:this.miPortfolio.nombre,apellido:this.miPortfolio.apellido,titulo:this.miPortfolio.titulo});
      
    this.openVerticallyCentered(content);
  }

  /**
   * Si el usuario cierra el modal presionando la tecla escape, la función devuelve la cadena
   * 'presionando ESC'. Si el usuario cierra el modal haciendo clic en el fondo, la función devuelve la
   * cadena 'haciendo clic en un fondo'. De lo contrario, la función devuelve la cadena 'con:' seguida
   * del motivo por el que se cerró el modal
   * @param {any} reason - La razón por la que se descartó el modal.
   * @returns El motivo por el que se descartó el modal.
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * La función toma los valores del formulario y crea un nuevo objeto HttpParams. Luego establece los
   * valores del formulario en el objeto HttpParams. Luego se suscribe a la función putHeader en el
   * servicio datosPortfolio
   */
  private saveData() {
    const params = new HttpParams()
      .set('nombre', this.personaform.value.nombre)
      .set('apellido', this.personaform.value.apellido)
      .set('titulo', this.personaform.value.titulo)
      .set('imgUrl', this.miPortfolio.imgUrl)
      .set('about', this.miPortfolio.about);
    
    
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

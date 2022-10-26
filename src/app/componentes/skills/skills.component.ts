import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {  ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})


export class SkillsComponent implements OnInit, OnDestroy {
  skills: any;
  skillId: number;
  suscription: Subscription;


  

  constructor(
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) {}

  skillform = new FormGroup({
    nombre: new FormControl(''),
    nivel: new FormControl(),
    edit: new FormControl()
  });

  ngOnInit(): void {
    this.getSkills();

    
    this.datosPortfolio.refresh$.subscribe(result =>{
      this.getSkills();
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('obserbable cerrado');
  }

  getSkills() {
    this.datosPortfolio.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  add(content) {
    this.skillform.setValue({
      nombre:'',
      nivel:0 ,
      edit:0   
    });
    this.openVerticallyCentered(content);
  }

  edit(content,skill){
    console.log(skill);
    this.skillform.setValue({
      nombre: skill.nombre,
      nivel: skill.nivel,
      edit: 1
    });
    this.skillId=skill.id;
    this.openVerticallyCentered(content);
  }

  form() {
    if (this.skillform.value.edit == 0) {
      this.agregarBloque();
    } else {
      this.actualizarBloque();
    }
  }

  agregarBloque (){
    
    const body = {
      nombre:this.skillform.value.nombre,
      nivel:this.skillform.value.nivel,
    }
    this.datosPortfolio.postSkill(body).subscribe((data) => {});
    
    Swal.fire({
      title: '¡Genial!',
      text: 'Información agregada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    
    this.skills.push(body);
  }

  actualizarBloque(){
    const params = new HttpParams()
      .set('nombre', this.skillform.value.nombre)
      .set('nivel', this.skillform.value.nivel)
      .set('perId',1)
    this.datosPortfolio.putSkill(this.skillId,params).subscribe((data) => {});
   console.log(params);
    
   Swal.fire({
      title: '¡Genial!',
      text: 'Información editada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.getSkills();
  }

  
  borrarBloque(id,i) {
    Swal.fire({
      title: '¿Seguro quiere borrar este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortfolio.deleteSkill(id).subscribe((data) => {});
        Swal.fire({
          title: '¡Genial!',
          text: 'Información borrada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } 
    })
    
    this.skills.splice(i,1);
  }

 



}

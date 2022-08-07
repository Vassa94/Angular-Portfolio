import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/servicios/autorizacion.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  

  ngOnInit(): void {
  }
  isCollapse = false;   // estado del menu
  toggleState(): void { // manejador del evento menu
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }
  
  loggedIn = false;
  loggedUser:any = null;
  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid) {
          this.loggedIn = true
          setTimeout(async ()=>{
            this.loggedUser = (await this.autorizacionService.getUser().currentUser).email
          }, 500)
        } else {
          this.loggedIn = false
        }
      }, (error)=>{
        this.loggedIn = false
      })
  }
  logout(){
    this.autorizacionService.logout()
  }
 
}

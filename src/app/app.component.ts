import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { AutorizacionService } from 'src/app/servicios/autorizacion.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ang_Portfolio';
  


 ngOnInit(): void {
  const demoClasses = document.querySelectorAll('.edicion');
  demoClasses.forEach(element => {
  element.textContent = 'edicion-hide';
});

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



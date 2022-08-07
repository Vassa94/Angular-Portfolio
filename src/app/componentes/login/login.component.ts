import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/servicios/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  loginParams:any = {};
  user:string;

  pass:string;

  constructor(public authService:AutorizacionService) { }

  login() {
    this.authService.login(this.loginParams.email, this.loginParams.password);

    console.log(this.user);
    console.log(this.pass);
  }
   

}

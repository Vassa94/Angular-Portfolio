import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  user:string;

  pass:string;

  constructor() { }

  login() {
    console.log(this.user);
    console.log(this.pass);
  }

}

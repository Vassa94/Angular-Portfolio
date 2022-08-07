import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from  'firebase/app'
import Swal from 'sweetalert2';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})

export class AutorizacionService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.isLogged();
  }


  
  public login = (email, password) => {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        Swal.fire({
          title: '¡Genial!',
          text: 'Inicio de sesión con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['']);
      }) .catch((error) => {
        Swal.fire('Ops...', `Ha ocurrido un ${error}`, 'error');
      });
  }
  public isLogged() {
    return this.angularFireAuth.authState;
  }
  public logout() {
    this.angularFireAuth.signOut();
    Swal.fire('¡Adiós!', 'Sesión cerrada con éxito', 'success');
    this.router.navigate(['']);
  }
  public getUser() {
    return this.angularFireAuth;
  }
}

  


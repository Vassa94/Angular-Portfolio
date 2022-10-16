import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class PortfolioService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  api = 'https://portfoliobackendvassallo.herokuapp.com'

  obtenerDatos(): Observable<any> {
    return this.http.get('./assets/data/data.json');
    //return this.http.get("http://localhost:8080/personas/traer");
  }

  getHeader(): Observable<any> {
    console.log(this.api+'/personas/traer/1');
    
    return this.http.get(this.api+'/personas/traer/1');
  }

  putHeader(body): Observable<object> {
    return this.http
      .put<any>(this.api+'/personas/editar/1', body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  getEduc(): Observable<any> {
    return this.http.get(this.api+'/educacion/traer');
  }

  deleteEduc(id): Observable<object> {
    return this.http
      .delete(this.api+'/educacion/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  postEduc(body): Observable<any> {
    return this.http.post(this.api+'/educacion/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putEduc(id, body): Observable<object> {
    return this.http
      .put<any>(this.api+'/educacion/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  getExp(): Observable<any> {
    return this.http.get(this.api+'/experiencia/traer');
  }

  postExp(body): Observable<any> {
    return this.http.post(this.api+'/experiencia/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putExp(id, body): Observable<object> {
    return this.http
      .put<any>(this.api+'/experiencia/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteExp(id): Observable<object> {
    return this.http
      .delete(this.api+'/experiencia/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

 

  getProyec(): Observable<any> {
    return this.http.get(this.api+'/proyectos/traer')
    
  }

  postProyect(body): Observable<any> {
    return this.http.post(this.api+'/proyectos/crear', body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putProyect(id, body): Observable<object> {
    return this.http
      .put<any>(this.api+'/proyectos/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteProyect(id): Observable<object> {
    return this.http
      .delete(this.api+'/proyectos/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }


  getSkills(): Observable<any> {
    return this.http.get(this.api+'/habilidades/traer');
  }

  postSkill(body): Observable<any> {
    return this.http.post(this.api+'/habilidades/crear', body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putSkill(id, body): Observable<object> {
    return this.http
      .put<any>(this.api+'/habilidades/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteSkill(id): Observable<object> {
    return this.http
      .delete(this.api+'/habilidades/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  
}

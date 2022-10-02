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

  obtenerDatos(): Observable<any> {
    return this.http.get('./assets/data/data.json');
    //return this.http.get("http://localhost:8080/personas/traer");
  }

  getHeader(): Observable<any> {
    return this.http.get('http://localhost:8080/personas/traer/1');
  }

  putHeader(body): Observable<object> {
    return this.http
      .put<any>('http://localhost:8080/personas/editar/1', body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  getEduc(): Observable<any> {
    return this.http.get('http://localhost:8080/educacion/traer');
  }

  deleteEduc(id): Observable<object> {
    return this.http
      .delete('http://localhost:8080/educacion/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  postEduc(body): Observable<any> {
    return this.http.post('http://localhost:8080/educacion/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putEduc(id, body): Observable<object> {
    return this.http
      .put<any>('http://localhost:8080/educacion/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  getExp(): Observable<any> {
    return this.http.get('http://localhost:8080/experiencia/traer');
  }

  postExp(body): Observable<any> {
    return this.http.post('http://localhost:8080/experiencia/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putExp(id, body): Observable<object> {
    return this.http
      .put<any>('http://localhost:8080/experiencia/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteExp(id): Observable<object> {
    return this.http
      .delete('http://localhost:8080/experiencia/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

 

  getProyec(): Observable<any> {
    return this.http.get('http://localhost:8080/proyectos/traer')
    
  }

  postProyect(body): Observable<any> {
    return this.http.post('http://localhost:8080/proyectos/crear', body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putProyect(id, body): Observable<object> {
    return this.http
      .put<any>('http://localhost:8080/proyectos/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteProyect(id): Observable<object> {
    return this.http
      .delete('http://localhost:8080/proyectos/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }


  getSkills(): Observable<any> {
    return this.http.get('http://localhost:8080/habilidades/traer');
  }

  postSkill(body): Observable<any> {
    return this.http.post('http://localhost:8080/habilidades/crear', body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putSkill(id, body): Observable<object> {
    return this.http
      .put<any>('http://localhost:8080/habilidades/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteSkill(id): Observable<object> {
    return this.http
      .delete('http://localhost:8080/habilidades/borrar/' + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject, tap } from 'rxjs';

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

  getEduc(): Observable<any> {
    return this.http.get('http://localhost:8080/educacion/traer');
  }

  deleteEduc(id): Observable<object> {
    return this.http
      .delete('http://localhost:8080/educacion/borrar/' + id).pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  getExp(): Observable<any> {
    return this.http.get('http://localhost:8080/experiencia/traer');
  }

  postExp(body):Observable<any>{
    return this.http.post("http://localhost:8080/experiencia/crear",body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  getSkills(): Observable<any> {
    return this.http.get('http://localhost:8080/habilidades/traer');
  }

  getProyec(): Observable<any> {
    return this.http.get('http://localhost:8080/proyectos/traer');
  }

  putHeader(body): Observable<object> {
    return this.http.put<any>('http://localhost:8080/personas/editar/1', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }
}

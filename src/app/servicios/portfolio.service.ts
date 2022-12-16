import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  api = 'http://portfoliobackend-env.eba-cempuzyt.us-east-1.elasticbeanstalk.com';
  apiContacto = 'https://mailthis.to/vassalloignacio';

  obtenerDatos(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  getHeader(): Observable<any> {
    return this.http.get(this.api + '/personas/traer/1');
  }

  putHeader(body): Observable<object> {
    return this.http.put<any>(this.api + '/personas/editar/1', body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getEduc(): Observable<any> {
    return this.http.get(this.api + '/educacion/traer');
  }

  deleteEduc(id): Observable<object> {
    return this.http.delete(this.api + '/educacion/borrar/' + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  postEduc(body): Observable<any> {
    return this.http.post(this.api + '/educacion/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  putEduc(id, body): Observable<object> {
    return this.http.put<any>(this.api + '/educacion/editar/' + id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getExp(): Observable<any> {
    return this.http.get(this.api + '/experiencia/traer');
  }

  postExp(body): Observable<any> {
    return this.http.post(this.api + '/experiencia/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  putExp(id, body): Observable<object> {
    return this.http
      .put<any>(this.api + '/experiencia/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('obserbable iniciado');
        })
      );
  }

  deleteExp(id): Observable<object> {
    return this.http.delete(this.api + '/experiencia/borrar/' + id).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  getProyec(): Observable<any> {
    return this.http.get(this.api + '/proyectos/traer');
  }

  postProyect(body): Observable<any> {
    return this.http.post(this.api + '/proyectos/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  putProyect(id, body): Observable<object> {
    return this.http.put<any>(this.api + '/proyectos/editar/' + id, body).pipe(
      tap(() => {
        this._refresh$.next();
        console.log('obserbable iniciado');
      })
    );
  }

  deleteProyect(id): Observable<object> {
    return this.http.delete(this.api + '/proyectos/borrar/' + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getSkills(): Observable<any> {
    return this.http.get(this.api + '/habilidades/traer');
  }

  postSkill(body): Observable<any> {
    return this.http.post(this.api + '/habilidades/crear', body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  putSkill(id, body): Observable<object> {
    return this.http.put<any>(this.api + '/habilidades/editar/' + id, body)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  deleteSkill(id): Observable<object> {
    return this.http.delete(this.api + '/habilidades/borrar/' + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  contactMsg(input: any) {
    return this.http.post(this.apiContacto, input);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  

  constructor(private http:HttpClient) { }

  obtenerDatos ():Observable<any> {
    return this.http.get("./assets/data/data.json");
    //return this.http.get("http://localhost:8080/personas/traer");
  }

  getHeader ():Observable<any> {
    return this.http.get("http://localhost:8080/personas/traer/1");
  }

  putHeader ():Observable<any> {

  }

}

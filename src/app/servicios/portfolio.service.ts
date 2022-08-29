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

  getEduc ():Observable<any> {
    return this.http.get("http://localhost:8080/educacion/traer");
  }

  deleteEduc (id){
    return this.http.delete("http://localhost:8080/educacion/borrar/"+id);
    
  }

  getExp ():Observable<any> {
    return this.http.get("http://localhost:8080/experiencia/traer");
  }

  getSkills ():Observable<any> {
    return this.http.get("http://localhost:8080/habilidades/traer");
  }
  
  getProyec ():Observable<any> {
    return this.http.get("http://localhost:8080/proyectos/traer");
  }

  putHeader (body) {
     this.http.put<any>("http://localhost:8080/personas/editar/1",body);

  }

}

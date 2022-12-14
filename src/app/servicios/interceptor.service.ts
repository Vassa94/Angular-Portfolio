import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>>{

    const token: string = "IdToken";

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          autorizacion: 'Bearer ${ token }'
        }
      })
    }

    //console.log("paso por interceptor");
    

    return next.handle(request);

  }
}

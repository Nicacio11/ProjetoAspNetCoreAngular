import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('Token')!== null){
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('Token')}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    succ => {},
                    error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('user/login');
                        }
                    }
                )
            );
          }
        const cloneReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('Token')}`)
                .set('Access-Control-Allow-Origin', '*')
                .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
                .set('Access-Control-Allow-Headers',
                    // tslint:disable-next-line: max-line-length
                    'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type')
        })
        return next.handle(cloneReq);
}
}
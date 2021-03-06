import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //npm i @auth0/angular-jwt
  baseURL = `${environment.baseUrl}api/user/`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(`${this.baseURL}login`, model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('Token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }
  register(model: User){
    console.log(model)
    return this.http.post(`${this.baseURL}register`, model);
  }
  loggedIn(){
    const token = localStorage.getItem('Token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  User(){
    const token = localStorage.getItem('Token');
    return this.jwtHelper.decodeToken(token).unique_name;
  }
}

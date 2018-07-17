import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  base_url = 'http://localhost:3000/api/'
  constructor(private http: Http) { }

  get(url) {
    return this.http.get(this.base_url + url).map(res => res.json());
  }
  post(url, data) {
    var header = new Headers();
    // header.append('Content-Type', 'multipart/form-data');, { headers: header } 
    return this.http.post(this.base_url + url, data)
      .map(res => {
        // let result = res.json();
        //if (result && result.token) {
        //localStorage.setItem('Token', result.token);
        if (res.json()) {
          return true;
        }
        return false;
      });
  }

  authenticateUser(url, data) {
    return this.http.post(this.base_url + url, data)
      .map(res => {
        let result = res.json();
        if (result && result.token) {
          localStorage.setItem('Token', result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('Token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('Token');
    if (!token) return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('Token');
    if (!token) return null;

    return new JwtHelper().decodeToken(token);
  }

}
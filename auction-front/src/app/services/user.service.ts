import { Injectable } from '@angular/core';
import { Http,Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  base_url='http://localhost:3000/api/'
  constructor(private http : Http) { }

  get(url){
    return this.http.get(this.base_url+url).map(res => res.json());
  }
  post(url , data){
    var header=new Headers();
    header.append('Content-Type','application/json');
    return this.http.post(this.base_url+url,data,{headers:header}).map(res => res.json());
  }

  authenticateUser(url , data){
    return this.http.post(this.base_url+url , data).map(res => res.json());
  }


}
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers } from "@angular/http";

@Injectable()
export class ProductService {
  base_url = 'http://localhost:3000/api/';

  constructor(private http: Http) { }

  addAuction(url , data) {
    return this.http.post(this.base_url + url, data).map(res => {
      if (res.json()) {
        return true;
      }
      return false;
    });
  }

}
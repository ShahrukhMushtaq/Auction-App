import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers } from "@angular/http";

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  public addAuction(data, url) {
    this.http.post("http://localhost:3000/api/" + url, data).map(res => {
      if (res) {
        let result = res.json();
        return result;
      }
    });
  }

}
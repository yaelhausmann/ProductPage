import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  public headers = { withCredentials: true, 'Content-Type': 'application/json' };

  constructor(
    private http: HttpClient,
  ) { }

  public getProducts(){
    return this.http.get(`../../assets/json/products.json`);
  }
  public getProductGalien(ean: string): Observable<any> {
    return this.http.get<any>(`https://marketplace.abbi.care/products-v2?ean=${ean}`, this.headers)
  }

  public getProductsGalienbyCategory(category: string, type: string): Observable<any> {
    return this.http.get<any>(`https://marketplace.abbi.care/products-v2?${category}=${type}`, this.headers)
  }


}

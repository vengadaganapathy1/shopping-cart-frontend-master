import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ProductDetails } from '../models/product-details.model';
import { PROCUCT_MANAGEMENT } from '../constants/constant';

const baseUrl = PROCUCT_MANAGEMENT.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  public showProductDetailsEmitter: BehaviorSubject<ProductDetails> =
    new BehaviorSubject<ProductDetails>({});
  public showProductDetailsObserver$: Observable<ProductDetails>;

  public updateProductDetailsEmitter: BehaviorSubject<ProductDetails> =
    new BehaviorSubject<ProductDetails>({});
  public updateProductDetailsObserver$: Observable<ProductDetails>;

  public showListPageEmitter: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public showListPageObserver$: Observable<string>;

  constructor(private http: HttpClient) {
    this.showProductDetailsObserver$ =
      this.showProductDetailsEmitter.asObservable();
    this.showListPageObserver$ = this.showListPageEmitter.asObservable();
    this.updateProductDetailsObserver$ =
      this.updateProductDetailsEmitter.asObservable();
  }
  getAll(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(baseUrl);
  }

  get(id: string): Observable<ProductDetails> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: ProductDetails): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number | undefined, data: ProductDetails): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number | undefined): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByProductDetails(url: string): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${baseUrl}${url}`);
  }
}

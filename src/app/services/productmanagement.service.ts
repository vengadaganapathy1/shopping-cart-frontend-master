import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ProductDetails } from '../models/product-details.model';
import { ApiResponse } from '../models/api-response.model';
import { PRODUCT_MANAGEMENT } from '../constants/constant';

const baseUrl = PRODUCT_MANAGEMENT.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  public highlightEmitter: BehaviorSubject<ProductDetails> =
    new BehaviorSubject<ProductDetails>({});
  public highlightObserver$: Observable<ProductDetails>;

  constructor(private http: HttpClient) {
    this.highlightObserver$ = this.highlightEmitter.asObservable();
  }
  getAll(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(baseUrl);
  }

  get(id: string): Observable<ProductDetails> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: ProductDetails): Observable<ProductDetails> {
    return this.http
      .post(baseUrl, data)
      .pipe(map((responseData: ProductDetails) => responseData));
  }

  update(
    id: number | undefined,
    data: ProductDetails
  ): Observable<ApiResponse> {
    return this.http
      .put(`${baseUrl}/${id}`, data)
      .pipe(map((responseData: ApiResponse) => responseData));
  }

  delete(id: number | undefined): Observable<ApiResponse> {
    return this.http
      .delete(`${baseUrl}/${id}`)
      .pipe(map((responseData: ApiResponse) => responseData));
  }

  deleteAll(): Observable<ApiResponse> {
    return this.http
      .delete(baseUrl)
      .pipe(map((responseData: ApiResponse) => responseData));
  }

  findByProductDetails(url: string): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(url);
  }
}

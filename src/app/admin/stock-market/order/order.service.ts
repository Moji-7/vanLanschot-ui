import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, Subject, tap, throwError } from 'rxjs';
import { OrderRequest, OrderResponse } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class  OrderService{
  orderResponseCaller!: Subject<OrderRequest>;
  //orderSubmited!: OrderResponse;

  constructor(private http: HttpClient) {
  this.orderResponseCaller = new Subject<OrderRequest>();
  // this.orderSubmited  = {} as OrderResponse;

  }
  apiUrl = '/api';
  orderRegister(orderRequest:OrderRequest): Observable<OrderResponse> {
    debugger;
    orderRequest.id = null;
    //const options = name ? { params: new HttpParams().set('name', name) } : {};
    return this.http
      .post<OrderResponse>(this.apiUrl + '/orderRequest', orderRequest)
      .pipe(
        delay(200),
        tap((res) => console.log('try register new order', res)),
        catchError(this.handleError)
      );
  }



  orderInquiry(orderResponse:OrderResponse): Observable<OrderResponse> {
    debugger;
    let traceNumber=orderResponse.respone.traceId
    const options = traceNumber ? { params: new HttpParams().set('tracenumber', traceNumber) } : {};
    return this.http
      .get<OrderResponse>(this.apiUrl + '/orderInquiry', options)
      .pipe(
        delay(2000),
        tap((res) => console.log('api cal inquiry for new order', res)),
        catchError(this.handleError)
      );
  }
  handleError(e: HttpErrorResponse) {
    return throwError(e.message || 'serverError');
  }
}

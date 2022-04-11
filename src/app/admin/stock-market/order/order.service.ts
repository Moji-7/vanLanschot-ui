import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, Subject, tap, throwError } from 'rxjs';
import { Order, OrderResponse } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderResponseCaller!: Subject<Order>;
  constructor(private http: HttpClient) {
    this.orderResponseCaller = new Subject<Order>();
  }
  public traceIdGenerator(){
    return Math.floor(100000 + Math.random() * 900000);
  }

  apiUrl = '/api';


  orderPre(orderResponse: OrderResponse): Observable<OrderResponse> {
    debugger;
    return this.http
      .post<OrderResponse>(this.apiUrl + '/orderInquiry/', {orderResponse})
      .pipe(
        delay(1000),
        tap((res) => console.log('submit pre order request', res)),
        catchError(this.handleError)
      );
  }

  orderRegister(orderRequest: Order): Observable<Order> {
    debugger;
    //const options = name ? { params: new HttpParams().set('name', name) } : {};
    return this.http
      .post<Order>(this.apiUrl + '/orderRequest', orderRequest)
      .pipe(
        delay(200),
        tap((res) => console.log('try register new order', res)),
        catchError(this.handleError)
      );
  }

  orderInquiry(orderResponse: Order): Observable<OrderResponse> {
    debugger;
    const options = {
      params: new HttpParams().set('id', orderResponse.request.traceId),
    };

    return this.http
      .get<OrderResponse>(this.apiUrl + '/orderInquiry/', options)
      .pipe(
        delay(1000),
        tap((res) => console.log('call inquiry for order & result is', res)),
        catchError(this.handleError)
      );
  }
  handleError(e: HttpErrorResponse) {
    return throwError(e.message || 'serverError');
  }
}

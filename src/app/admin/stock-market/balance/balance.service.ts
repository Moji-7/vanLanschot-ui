import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Balance } from './balance.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  changeBalanceCaller!: Subject<number>;

  constructor(private http: HttpClient) {
    this.changeBalanceCaller = new Subject<number>();
  }

  apiUrl = '/api';
  getBalance(): Observable<Balance> {
    //const options = name ? { params: new HttpParams().set('name', name) } : {};
    return this.http.get<Balance[]>(this.apiUrl + '/balance/').pipe(
      delay(200),
      tap((res) => console.log('try get balance', res)),
      //map((res)=>res:any[]=res[0])
      map((val) => {return val[0] as Balance }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  ///
  updateBalance(newCredit: number): Observable<Balance> {
    debugger;
    const options = newCredit
      ? { params: new HttpParams().set('credit', newCredit) }
      : {};
    let id = 1;
    let balance: Balance = {
      id:1,
      credit: newCredit,
      locked: 0,
      profit: '22',
    };

    return this.http.put<Balance>(`${this.apiUrl + '/balance'}/${balance.id}`, balance).pipe(
      delay(200),
      tap((res) => console.log('try update credit', res)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  ///

  handleError(e: HttpErrorResponse) {
    return throwError(e.message || 'serverError');
  }
}

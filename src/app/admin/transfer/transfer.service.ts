import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, tap } from 'rxjs/operators';
//import { AppConfig } from '../config/config';
//import { BaseService } from './base.service';
//import { Token } from '../models/token';
//import { Helpers } from '../helpers/helpers';
import { Injectable } from '@angular/core';
import { Transfer } from './transfer.model';
@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://localhost:7271/api/transfer';

  transferRequest(): Observable<Transfer[]> {
    //const options = name ? { params: new HttpParams().set('name', name) } : {};
    var body = {
      cardNumber: '4001 5900 0000 0001',
      amount: '4544',
      counterpartyIBAN: '12-4356789-345',
      counterpartyName: 'ali',
      description: '',
    };
    return this.http
      .post<Transfer[]>(this.apiUrl + '/transferRequest', body)
      .pipe(
        delay(2000),
        tap((res) => console.log('api cal submit new transfer', res)),
        catchError(this.handleError)
      );
  }
  ///////////////////////////////////////////////////////////////////
  getTransfer(): Observable<Transfer[]> {
    //const options = name ? { params: new HttpParams().set('name', name) } : {};
    var body = { CardNumber: '4001 5900 0000 0001' };
    return this.http
      .post<Transfer[]>(this.apiUrl + '/GetTransferRequests', body)
      .pipe(
        tap((res) => console.log('api response of transfer list', res)),
        catchError(this.handleError),
        retry(3)
        //,catchError(err => of([]))
      );
  }
  ///////////////////////////////////////////////////////////////////
  signTransfer(uid: string) {
    const url = `${this.apiUrl}/SignTransferRequest/${uid}`; // DELETE api/heroes/42
    const options = uid ? { params: new HttpParams().set('uid', uid) } : {};
    return this.http
      .put<Transfer>(url, options)
      .pipe(catchError(this.handleError));
  }
  handleError(e: HttpErrorResponse) {
    return throwError(e.message || 'serverError');
  }
}

// @Injectable()
// export class TokenService extends BaseService {
//   private pathAPI = this.config.setting['PathAPI'];
//   public errorMessage: string;
//   constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) {
//     super(helper);
//   }
//   auth(data: any): any {
//     let body = JSON.stringify(data);
//     return this.getToken(body);
//   }
//   private getToken (body: any): Observable<any> {
//     return this.http.post<any>(this.pathAPI + 'token', body, super.header()).pipe(
//         catchError(super.handleError)
//       );
//   }

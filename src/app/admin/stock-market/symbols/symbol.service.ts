import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { PriceInfo, SymbolState,chartData } from '../common.model';
import { StockSymbol } from './symbol.model';

@Injectable({
  providedIn: 'root',
})
export class SymbolService {
  private readonly symbols = [
    {
      Id: 110,
      name: 'AAPL',
      state: SymbolState.Open,
      description: 'Apple Inc',
      icon: '/assets/images/aapl.png',
      Group: 2,
    },
    {
      Id: 151,
      name: 'MSFT',
      state: SymbolState.Open,
      description: 'Microsoft Corporation',
      icon: '/assets/images/msft.png',
      Group: 2,
    },
    {
      Id: 66,
      name: 'ORCL',
      state: SymbolState.Open,
      description: 'Oracle Corporation',
      icon: '/assets/images/orcl.png',
      Group: 2,
    },
    {
      Id: 116,
      name: 'IBM',
      state: SymbolState.Open,
      description: 'IBM Common Stock',
      icon: '/assets/images/ibm.png',
      Group: 2,
    },
  ];
  private readonly rangePrice = [
    { min: 120, max: 130 },
    { min: 54, max: 62 },
    { min: 38, max: 44 },
    { min: 87, max: 93 },
  ];
  private readonly signs = ['+', '-'];

  constructor(private http: HttpClient) {}

  createPriceInfo(id: number): PriceInfo {
    let priceInfo: PriceInfo = {
      id: id,
      rangePrice:
        this.rangePrice[this.getRandomArrayIndex(this.rangePrice.length)],
      openPrice: 0,
      lastPrice: { price: 0, change: 0 },
      currentPrice: { price: 0, change: 0 },
    };
    priceInfo.openPrice =
      (priceInfo.rangePrice.min + priceInfo.rangePrice.max) / 2;

    let change = this.getRandomChange(priceInfo.openPrice);
    //lastPrice
    priceInfo.lastPrice = {
      price: this.getNewPrice(priceInfo.openPrice, change),
      change: change,
    };
    //currentPrice
    change = this.getRandomChange(priceInfo.lastPrice.price);
    priceInfo.currentPrice = {
      price: this.getNewPrice(priceInfo.lastPrice.price, change),
      change: change,
    };
    return priceInfo;
  }
  createNewSymbol(id: number, priceInfo: PriceInfo): StockSymbol {
    // let symbol!: StockSymbol;
    let _symbol = {} as StockSymbol;
    Object.assign(_symbol, this.symbols[id]);
    _symbol.priceInfo = priceInfo;
    return _symbol;
  }

  create4Symbols(): StockSymbol[] {
    const symbols: StockSymbol[] = [];
    for (let i = 0; i <= this.symbols.length-1; i++) {
      let priceInfo: PriceInfo = this.createPriceInfo(i);
      symbols.push(this.createNewSymbol(i, priceInfo));
    }
    return symbols;
  }

  private getRandomArrayIndex(length: number): number {
    return Math.round(Math.random() * (length - 1));
  }
  private getRandomPercent(change: number, sign: string): number {
    return parseFloat(sign + change);
  }
  private getRandomChange(price: number): number {
    let result=((price *
        this.getRandomPercent(
          this.getRandomArrayIndex(4) + 1,
          this.signs[this.getRandomArrayIndex(this.signs.length)]
        )) /
      100
    ).toFixed(2)
    return parseFloat(result);

  }
  private getNewPrice(price: number, change: number): number {
    return parseFloat((price + (price * change) / 100).toFixed(2));
  }

  //todo must go to seprate service
  apiUrl = '/api';
  getChartData(symbolName:string): Observable<chartData> {

    const options = symbolName ? { params: new HttpParams().set('symbolName', symbolName) } : {};

    return this.http.get<chartData>(this.apiUrl+'/chartData/',options).pipe(
      delay(200)
      //,map((response: any) => response.data)
      ,tap((res) => console.log('try register new order', res)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  handleError(e: HttpErrorResponse) {
    return throwError(e.message || 'serverError');
  }


}

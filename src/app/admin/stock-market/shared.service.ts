import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StockSymbol } from './symbols/symbol.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectSymbol!: Subject<StockSymbol>;
  symbolSelected!: StockSymbol;

  constructor() {
    this.selectSymbol = new Subject<StockSymbol>();
     this.symbolSelected  = {} as StockSymbol;
  }
}

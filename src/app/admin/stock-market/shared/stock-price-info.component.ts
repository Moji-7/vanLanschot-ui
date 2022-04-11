import { Component, Input, OnInit } from '@angular/core';
import { PriceInfo } from '../common.model';
import { SharedService } from '../shared.service';
import { StockSymbol } from '../symbols/symbol.model';

@Component({
  selector: 'stock-price-info',
  template: `current:<span style="font-weight: bold;" >{{priceInfo.currentPrice.price}}$
    </span><span [ngClass]="[priceInfo.currentPrice.change>0 ? 'mosbat' : 'manfi']" >
      ({{priceInfo?.currentPrice?.change}})
  </span>`,
  styleUrls: ['./style.css']
})
export class stockPriceInfoComponent implements OnInit {
  @Input()
  priceInfo: PriceInfo = {} as PriceInfo;;

  constructor( private sharedService: SharedService,) { }

  ngOnInit(): void {
    console.log(this.priceInfo);
  }

}
// currentPrice: {price: 57.98, change: -1.1734}
// id: 1
// lastPrice: {price: 58.67, change: 1.16}
// openPrice: 58
// rangePrice: {min: 54, max: 62}

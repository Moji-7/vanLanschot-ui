import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { StockSymbol } from '../symbol.model';

@Component({
  selector: 'symbol-info',
  templateUrl: './symbol-info.component.html',
  styleUrls: ['./symbol-info.component.css'],
})
export class SymbolInfoComponent implements OnInit {
  symbolSelected = {} as StockSymbol;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.selectSymbol.subscribe((response: StockSymbol) => {
      this.symbolSelected = response;

    });
  }
}

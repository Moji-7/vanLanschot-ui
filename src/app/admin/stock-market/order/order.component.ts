import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { StockSymbol } from '../symbols/symbol.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  symbolSelected = {} as StockSymbol;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
     //what symbol selected
     this.sharedService.selectSymbol.subscribe((response: StockSymbol) => {
      this.symbolSelected = response;
      console.log(this.symbolSelected)
    });
  }

}

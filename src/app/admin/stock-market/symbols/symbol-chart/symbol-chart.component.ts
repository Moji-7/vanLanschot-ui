import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { StockSymbol } from '../symbol.model';
import { SymbolService } from '../symbol.service';

@Component({
  selector: 'symbol-chart',
  templateUrl: './symbol-chart.component.html',
  styleUrls: ['./symbol-chart.component.css'],
})
export class SymbolChartComponent implements OnInit {
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  chartClicked(e: any): void {
    console.log(e.active);
    console.log(e.event);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  symbolSelected = {} as StockSymbol;
  constructor(
    private sharedService: SharedService,
    private symbolService: SymbolService
  ) {}
  ngOnInit(): void {
    //symbol selected
    this.sharedService.selectSymbol.subscribe((response: StockSymbol) => {
      this.symbolSelected = response;
      //todo
      //load chart data
      this.getChartData(this.symbolSelected.name);
    });
  }
  private getChartData(symbolName: string) {
    this.symbolService
      .getChartData(symbolName)
      .pipe()
      .subscribe((response: any) => {
        //debugger;
        this.lineChartData = [response[0].lineChartData];
      });
  }
}

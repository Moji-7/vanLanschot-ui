import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PriceInfo, SymbolState } from '../../common.model';
import { SharedService } from '../../shared.service';
import { StockSymbol } from '../symbol.model';
import { SymbolService } from '../symbol.service';

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.css'],
})
export class SymbolSearchComponent implements OnDestroy {
  symbolCtrl = new FormControl();
  filteredSymbols: Observable<StockSymbol[]>;
  symbols!: StockSymbol[];
  setSelectedSymbol!: Subscription;
  symbolSelected!: string; //StockSymbol;

  constructor(
    private readonly symbolService: SymbolService,
    private sharedService: SharedService
  ) {
    this.symbols = this.symbolService.create4Symbols();

    this.filteredSymbols = this.symbolCtrl.valueChanges.pipe(
      startWith(''),
      map((symbol) =>
        symbol ? this._filterSymbols(symbol) : this.symbols.slice()
      )
    );
  }

  private _filterSymbols(value: string): StockSymbol[] {
    const filterValue = value.toLowerCase();

    return this.symbols.filter((symbol) =>
      symbol.name.toLowerCase().includes(filterValue)
    );
  }

  //select symbol on auto complete
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    //other subscriber componet will get value
    // event.option.value as StockSymbol;
    let selectedSymbol = this._filterSymbols(event.option.value)[0]; // : this.symbols.slice()
    //broad cast i selected
    this.sharedService.selectSymbol.next(selectedSymbol);

  }

  ngOnDestroy(): void {
    if (this.setSelectedSymbol) {
      this.setSelectedSymbol.unsubscribe();
    }
  }
}

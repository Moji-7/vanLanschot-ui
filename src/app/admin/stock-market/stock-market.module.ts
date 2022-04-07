import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockMarketRoutingModule } from './stock-market-routing.module';

import { StockHomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SymbolSearchComponent } from './symbols/symbol-search/symbol-search.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonService } from './common.service';
import { MarketInfoComponent } from './market-info/market-info.component';
import { stockPriceInfoComponent } from './shared/stock-price-info.component';
import { stockSymbolInfoComponent } from './shared/stock-symbol-info.component';
import { OrderComponent } from './order/order.component';
import { SymbolInfoComponent } from './symbols/symbol-info/symbol-info.component';
import { SymbolChartComponent } from './symbols/symbol-chart/symbol-chart.component';
import { OrderResultComponent } from './order/order-result/order-result.component';
import { OrderSetComponent } from './order/order-set/order-set.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiService } from './api-service.service';
import { DataService } from '../dynamic-form/create/services/data-api.service';


import { FlexLayoutModule } from '@angular/flex-layout';

import { NgChartsModule } from 'ng2-charts';



// import { SymbolInfoComponent } from './symbols/symbol-info/symbol-info.component';
// import { SymbolSearchComponent } from './symbols/symbol-search/symbol-search.component';
// import { SymbolChartComponent } from './symbols/symbol-chart/symbol-chart.component';
// import { OrderSetComponent } from './order/order-set/order-set.component';
// import { OrderResultComponent } from './order/order-result/order-result.component';
// import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    StockHomeComponent,
    stockPriceInfoComponent,
    stockSymbolInfoComponent,
    BalanceComponent,
    // SymbolInfoComponent,
     OrderComponent,
    SymbolSearchComponent,
    OrderSetComponent,
    OrderResultComponent,
    SymbolChartComponent,
    SymbolInfoComponent,
    // SymbolChartComponent,
    // OrderSetComponent,
    // OrderResultComponent,
    PortfolioComponent,
    MarketInfoComponent,

  ],

  imports: [
    CommonModule,
    StockMarketRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgChartsModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
  providers: [CommonService],
})
export class StockMarketModule {}

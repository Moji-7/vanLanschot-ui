import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockHomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SymbolSearchComponent } from './symbols/symbol-search/symbol-search.component';

const routes: Routes = [
  {
    path: '',
    component: StockHomeComponent,
    children: [
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockMarketRoutingModule {}

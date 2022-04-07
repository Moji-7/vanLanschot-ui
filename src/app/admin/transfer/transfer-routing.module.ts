import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferHistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { RegisterTransferComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'history',
        component: TransferHistoryComponent,
      },
      {
        path: 'register',
        component: RegisterTransferComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRoutingModule {}

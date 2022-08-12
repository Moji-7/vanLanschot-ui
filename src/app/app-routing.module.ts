import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';



const routes: Routes = [


  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
   // canActivate: [AuthGuard],
  },
  // {
  //   path: 'form-hero-template',
  //   component: HeroFormComponent,
  //   children: [
  //     {
  //       path: 'product',
  //       loadChildren: () =>
  //         import('./products/products.module').then((m) => m.ProductsModule),
  //       data: { icon: 'product module ', text: 'product' },
  //     },
  //   ],
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

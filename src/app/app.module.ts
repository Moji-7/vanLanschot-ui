import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { PasswordStrengthDirective } from './password-strength.directive';

import { AppRoutingModule } from './app-routing.module';
import { TitleCasePipe } from './shared/title-case.pipe';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data-service.service';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    PasswordStrengthDirective,
    TitleCasePipe,

  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }





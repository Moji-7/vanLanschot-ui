import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { HomeComponent } from './home/home.component';
import { QuestionDynamicFormComponent } from './create/question-dynamic-form';
import { HomeDynamicFormComponent } from './create/home-dynamic-form.component';
import { DynamicFormComponent } from './create/dynamic-form.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatListModule } from '@angular/material/list';
// import { StatComponent } from './stat/stat.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatListModule ,

    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule ,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  exports: [],
  declarations: [HomeComponent,HomeDynamicFormComponent,
    DynamicFormComponent,
    QuestionDynamicFormComponent]
})
export class DynamicFormModule {}

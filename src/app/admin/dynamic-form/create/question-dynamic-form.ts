import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './services/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './question-dynamic-form.html',
  styleUrls:['./question-dynamic-form.scss']
})
export class QuestionDynamicFormComponent {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;
  get isValid() {
    //return true
    return this.form.controls[this.question.key].valid;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

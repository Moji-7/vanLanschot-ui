import { QuestionBase } from './services/question-base';
import { QuestionControlService } from './services/question-control.service';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./question-dynamic-form.scss'],
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];

  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['questions']?.currentValue) {
      this.form = this.qcs.toFormGroup(this.questions as QuestionBase<any>[]);
      // debugger;
    }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
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

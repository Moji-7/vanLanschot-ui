import { Injectable } from '@angular/core';


import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CheckboxQuestion } from './question-checkbox';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient) {}
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),
      new CheckboxQuestion({
        key: 'check',
        label: 'agree',
        type: 'checkbox',
        // value: true,
        required: true,
        order: 4,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getfromApi(): Observable<QuestionBase<any>[]> {
    let productsUrl = 'api/questions/';
    return this.http
      .get<QuestionBase<any>[]>(productsUrl)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error.statusText || 'cant find resource');
  }
  /**
   *
   * @param qs
   * @returns
   */
  mapper(qs: QuestionBase<any>): QuestionBase<any> {
    switch (qs.type) {
      case 'checkbox':
        return new QuestionBase(
          new CheckboxQuestion({
            type: 'checkbox',
            key: 'check',
            label: qs.label,
            // value: qs.value,
            required: qs.required,
            order: qs.order,
          })
        );
      default:
        return new QuestionBase(
          new TextboxQuestion({
            key: qs.key,
            label: qs.label,
            value: qs.value,
            required: qs.required,
            order: qs.order,
          })
        );
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

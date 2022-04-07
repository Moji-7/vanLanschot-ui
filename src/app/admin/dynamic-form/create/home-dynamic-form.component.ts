import { Component, OnInit } from '@angular/core';
import { QuestionService } from './services/question.service';
import { QuestionBase } from './services/question-base';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { TextboxQuestion } from './services/question-textbox';
import { fn } from '@angular/compiler/src/output/output_ast';
import { CheckboxQuestion } from './services/question-checkbox';
@Component({
  selector: 'app-home-dynamic-form',
  templateUrl: './home-dynamic-form.component.html',
  styleUrls:['./question-dynamic-form.scss'],
  providers: [QuestionService],
})
export class HomeDynamicFormComponent implements OnInit {
  questionsApi$?: Observable<QuestionBase<any>[]>;

  constructor(private service: QuestionService) {}

  ngOnInit() {
    //this.questions$ = this.service.getQuestions().pipe(delay(0));
    // get api result (json file)
    this.questionsApi$ = this.service.getfromApi().pipe(
      // map((res) => res)
      map((instanceData) => instanceData.map(this.service.mapper)),
      tap((instanceData) => console.log('HTTP responsek k k :', instanceData))
    );
    //debugger;


  }
}

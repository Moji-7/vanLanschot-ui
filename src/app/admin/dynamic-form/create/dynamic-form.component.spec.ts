import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { defer } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { QuestionBase } from './services/question-base';
import { CheckboxQuestion } from './services/question-checkbox';
import { QuestionControlService } from './services/question-control.service';
import { TextboxQuestion } from './services/question-textbox';

let httpMock: HttpTestingController;
let questionControlService: QuestionControlService;
let comp: DynamicFormComponent;

let fixture: ComponentFixture<DynamicFormComponent>;
let h1: HTMLElement;
let form!: FormGroup;
// create new instance of FormBuilder
const formBuilder: FormBuilder = new FormBuilder();
let payLoad = '';

const questions: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'name',
    label: 'name',
    type: 'input',
    required: true,
    order: 1,
    value: 'ali',
  }),
  new CheckboxQuestion({
    key: 'check',
    label: 'are you agree?',
    type: 'checkbox',
    // value:false,
    required: true,
    order: 2,
  }),
];

class mockService {
  expectedHeroes: QuestionBase<any>[] = [
    new TextboxQuestion({
      key: 'name',
      label: 'name',
      type: 'input',
      required: true,
      order: 1,
      value: 'ali',
    }),
    new CheckboxQuestion({
      key: 'check',
      label: 'are you agree?',
      type: 'checkbox',
      // value:false,
      required: true,
      order: 2,
    }),
  ];
  /* emit cloned test hero */
  getHero = jasmine
    .createSpy('getfromApi')
    .and.callFake(() => this.asyncData(Object.assign({}, this.expectedHeroes)));

  asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
}

describe('WelcomeComponent (class only)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, BrowserModule, ReactiveFormsModule],

      providers: [
        DynamicFormComponent,
        { provide: QuestionControlService },
        { provide: FormBuilder, useValue: formBuilder },
      ],

      declarations: [DynamicFormComponent],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    // inject both the component and the dependent service.

    questionControlService = TestBed.inject(QuestionControlService);

      fixture = TestBed.createComponent(DynamicFormComponent);
    comp = TestBed.inject(DynamicFormComponent);
       comp.form = formBuilder.group({
        firstName: null,
        lastName: null
    });

  });

  it('should not have welcome message after construction', () => {
    //comp.ngOnInit();



    comp.questions = questions;

    fixture.detectChanges();
    comp.form = questionControlService.toFormGroup(
      questions as QuestionBase<any>[]
    );
    fixture.detectChanges();


    comp = fixture.componentInstance; // BannerComponent test instance

    debugger;

    fixture.detectChanges();
    h1 = fixture.nativeElement.querySelector('h2');

    expect(h1.textContent).toContain('dynamic form');
  });
});

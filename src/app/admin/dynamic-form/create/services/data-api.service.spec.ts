import { HttpClient } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { QuestionBase } from './question-base';
import { CheckboxQuestion } from './question-checkbox';
import { TextboxQuestion } from './question-textbox';
import { QuestionService } from './question.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let questionService: QuestionService;
beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  questionService = new QuestionService(httpClientSpy);
});

it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
  const expectedHeroes: QuestionBase<any>[] = [
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

  httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

  questionService.getfromApi().subscribe({
    next: (heroes) => {
      expect(heroes).withContext('expected heroes').toEqual(expectedHeroes);
      done();
    },
    error: done.fail,
  });
  expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
});
/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/**
 * Create async observable error that errors
 * after a JS engine turn
 */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('RestProvider', () => {
  //let  injector: TestBed;

  let myProvider: QuestionService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [QuestionService],
    });

    let testBed = getTestBed();

    myProvider = testBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('getProducts', () => {
    it('should return an Observable<QuestionBase[]> QuestionBase QuestionBase QuestionBase QuestionBase', () => {
      const expectedHeroes: QuestionBase<any>[] = [
        new TextboxQuestion({
          key: 'nameuuu',
          label: 'name',
          type: 'input',
          required: true,
          order: 1,
          value: 'reza',
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

      myProvider.getfromApi().subscribe((all) => {
        expect(all.length).toBe(2);
        expect(all).toEqual(expectedHeroes);
      });

      const request = httpMock.expectOne('api/questions/');
      //expect(req.request.method).toBe("GET");
      request.flush(expectedHeroes);
      httpMock.verify();
    });
  });
});

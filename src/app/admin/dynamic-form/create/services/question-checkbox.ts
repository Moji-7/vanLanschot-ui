import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<Boolean> {
  override controlType = 'checkbox';
  override value: Boolean|undefined ;
}

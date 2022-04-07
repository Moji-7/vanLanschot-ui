import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterTransferComponent implements OnInit {
  visible = true;
  myForm!: FormGroup ;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm();
    //this.counterPartyLoad('Robert');
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  };
  submitForm() {
    console.log(this.myForm.value);

  }
}

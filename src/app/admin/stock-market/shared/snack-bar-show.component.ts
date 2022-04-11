import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-show',
  template: `<div [innerHTML]="data.html"></div>`,
  styleUrls: ['./style.css'],
})
export class snackBarShowComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBar: MatSnackBar) {}

  ngOnInit(): void {}
}
